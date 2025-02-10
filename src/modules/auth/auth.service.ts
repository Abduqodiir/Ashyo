import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { LoginDto, RegisterDto, VerifyOtpDto, ResetPasswordDto } from './dtos';
import { AuthResponse } from './interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  private generateOtp(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  private generateTokens(userId: number, email: string, role: string) {
    return {
      accessToken: this.jwtService.sign(
        { userId, email, role },
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '24h', secret: process.env.JWT_ACCESS_SECRET },
      ),
      refreshToken: this.jwtService.sign(
        { userId, email, role },
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d', secret: process.env.JWT_REFRESH_SECRET },
      ),
    };
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, fullname, password } = registerDto;

    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException("Email allaqachon ro'yxatdan o'tgan", HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const tokens = this.generateTokens(user.id, user.email, user.role);

    return {
      ...tokens,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        is_verified: user.is_verified,
      },
      message: 'Ro‘yxatdan o‘tish muvaffaqiyatli amalga oshirildi',
    };
  }

  async sendOtp(email: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }

    const otp = this.generateOtp();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    global.otpStore = global.otpStore || {};
    global.otpStore[email] = { otp, expiresAt, userId: user.id };

    await this.mailerService.sendMail({
      to: email,
      subject: 'Tasdiqlash kodi',
      text: `Sizning tasdiqlash kodingiz: ${otp}`,
    });

    return { message: 'Tasdiqlash kodi emailingizga yuborildi' };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<AuthResponse> {
    const { email, otp } = verifyOtpDto;

    const otpData = global.otpStore?.[email];
    if (!otpData) {
      throw new HttpException('Tasdiqlash kodi topilmadi', HttpStatus.BAD_REQUEST);
    }

    if (otpData.otp !== otp) {
      throw new HttpException("Noto'g'ri tasdiqlash kodi", HttpStatus.BAD_REQUEST);
    }

    if (Date.now() > otpData.expiresAt) {
      delete global.otpStore[email];
      throw new HttpException('Tasdiqlash kodi muddati tugagan', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userModel.findOne({ where: { id: otpData.userId } });
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }

    await user.update({ is_verified: true });

    delete global.otpStore[email];

    const tokens = this.generateTokens(user.id, user.email, user.role);
    return {
      ...tokens,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        is_verified: user.is_verified,
      },
      message: "Email muvaffaqiyatli tasdiqlandi",
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) {
        throw new HttpException("Email yoki parol noto'g'ri", HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Hash bilan solishtirish
    if (!isPasswordValid) {
        throw new HttpException("Email yoki parol noto'g'ri", HttpStatus.UNAUTHORIZED);
    }

    const tokens = this.generateTokens(user.id, user.email, user.role);
    return {
        ...tokens,
        user: {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            is_verified: user.is_verified,
        },
        message: 'Muvaffaqiyatli login qilindi',
    };
}

  async sendOtpForPasswordReset(email: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }

    const otp = this.generateOtp();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    global.otpStore = global.otpStore || {};
    global.otpStore[email] = { otp, expiresAt, userId: user.id };

    await this.mailerService.sendMail({
      to: email,
      subject: 'Parolni tiklash kodi',
      text: `Sizning parolni tiklash kodingiz: ${otp}`,
    });

    return { message: 'Parolni tiklash kodi emailingizga yuborildi' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const { email, otp, new_password } = resetPasswordDto;

    const otpData = global.otpStore?.[email];
    if (!otpData) {
      throw new HttpException('Tasdiqlash kodi topilmadi', HttpStatus.BAD_REQUEST);
    }

    if (otpData.otp !== otp) {
      throw new HttpException("Noto'g'ri tasdiqlash kodi", HttpStatus.BAD_REQUEST);
    }

    if (Date.now() > otpData.expiresAt) {
      delete global.otpStore[email];
      throw new HttpException('Tasdiqlash kodi muddati tugagan', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userModel.findOne({ where: { id: otpData.userId } });
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    await user.update({ password: hashedPassword });

    delete global.otpStore[email];

    return { message: 'Parol muvaffaqiyatli yangilandi' };
  }
}
