import { Banner, Brand, Category, Color, Product, ProductConfiguration, ProductItem, User, UserRoles, Variation, VariationOption } from "@modules";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedsService implements OnModuleInit {
    constructor(@InjectModel(User) private userModel: typeof User,
        @InjectModel(Category) private categoryModel: typeof Category,
        @InjectModel(Product) private productModel: typeof Product,
        @InjectModel(Brand) private brandModel: typeof Brand,
        @InjectModel(Banner) private bannerModel: typeof Banner,
        @InjectModel(ProductItem) private productItemModel: typeof ProductItem,
        @InjectModel(Color) private colorModel: typeof Color,
        @InjectModel(Variation) private variationModel: typeof Variation,
        @InjectModel(VariationOption) private variationOptionModel: typeof VariationOption,
        @InjectModel(ProductConfiguration) private productConfigurationModel: typeof ProductConfiguration
    ) { }

    async onModuleInit() {
        await this.seedUsers();
        await this.seedCategory();
        await this.seedBrand();
        await this.seedColor();
        await this.seedProduct(); 
        await this.seedBanner();
        await this.seedProductItem();
        await this.seedVariation();
        await this.seedVariationOption();
        await this.seedProductConfiguration();
    }
    

    async seedUsers(): Promise<void> {
        const usersCount = await this.userModel.count();

        if (usersCount == 0) {
            const hashedPassword = await bcrypt.hash("password123", 10);

            await this.userModel.create({
                fullname: "Abduqodir Team Lead",
                email: "abduqodiir@gmail.com",
                phone_number: "+998884891727",
                image: "/ahmad_aka.jpg_6f5b92c6-44a8-47ae-9101-972a2c8982b4.jpg",
                password: hashedPassword,
                is_verified: true,
                role: UserRoles.admin
            });
        }
    }

    async seedCategory(): Promise<void> {
        const categoryCount = await this.categoryModel.count()
        if (categoryCount == 0) {
            await this.categoryModel.create({
                name: "Kiryuvish mashinalari",
                image: "/kiryuvish_mashinasi.png",
                icon: "/kiryuvish_mashinasi.svg",
            })
            await this.categoryModel.create({
                name: "Noutbuklar",
                image: "/noutbuklar.png",
                icon: "/noutbuklar.svg",
            })
            await this.categoryModel.create({
                name: "Televizorlar",
                image: "/televizor.png",
                icon: "/televizor.svg",
            })
            await this.categoryModel.create({
                name: "Muzlatkichlar",
                image: "/muzlakich.png",
                icon: "/muzlakich.svg",
            })
            await this.categoryModel.create({
                name: "Konditsiyonerlar",
                image: "/konditsiyoner.png",
                icon: "/konditsiyoner.svg",
            })
            await this.categoryModel.create({
                name: "Smartfonlar",
                image: "/smartfonlar.png",
                icon: "/smartfonlar.svg",
            })
            await this.categoryModel.create({
                name: "Chang yutkichlar",
                image: "/changyutkich.jpg",
                icon: "/changyutkich.svg",
            })
        }
    }

    async seedProduct(): Promise<void> {
        const productCount = await this.productModel.count();
        if (productCount === 0) {
            await this.productModel.bulkCreate([
                {
                    name: "Смартфон Xiaomi 12 Lite 8/128Gb Қора kamera 48/68 px",
                    category_id: 2,
                    description: "Xiaomi 12 Lite – zamonaviy dizayn va kuchli kameraga ega smartfon.",
                    nasiya: "6 oy",
                    summary: "Engil va kuchli smartfon, 120Hz AMOLED displey bilan.",
                    price: 6999,
                    rating: 5,
                    is_aksiya: true,
                    brand_id: 4,
                    image: "/xiamo12lite.png",
                    is_liked: false
                },
                {
                    name: "Samsung Galaxy S25 Ultra",
                    category_id: 2,
                    description: "Samsung Galaxy S25 Ultra - yuqori sifatli kamera va kuchli protsessor bilan.",
                    nasiya: "12 oy",
                    summary: "Snapdragon 8 Gen 3 protsessor, 200 MP kamera va AMOLED 2X displey.",
                    price: 11999,
                    rating: 5,
                    is_aksiya: false,
                    brand_id: 2,
                    image: "/s25ultra.png",
                    is_liked: false
                },
                {
                    name: "MacBook Pro M2 14-inch",
                    category_id: 3,
                    description: "Apple MacBook Pro M2 kuchli ishlash va uzoq batareya quvvati bilan ajralib turadi.",
                    nasiya: "6 oy",
                    summary: "Apple M2 chip, 14-inch Retina displey, 16GB RAM, 512GB SSD.",
                    price: 19999,
                    rating: 5,
                    is_aksiya: true,
                    brand_id: 5,
                    image: "/macbookprom2.png",
                    is_liked: false
                },
                {
                    name: "AirPods Pro 2",
                    category_id: 4,
                    description: "Apple AirPods Pro 2 - faollikni bostirish funksiyasi bilan mukammal eshitish tajribasi.",
                    nasiya: "6 oy",
                    summary: "Active Noise Cancellation, Spatial Audio, va uzun batareya muddati.",
                    price: 2499,
                    rating: 4,
                    is_aksiya: false,
                    brand_id: 5,
                    image: "/airpodspro2.png",
                    is_liked: false
                },
                {
                    name: "Play Station 5",
                    category_id: 4,
                    description: "Sony Play Station 5 osez kayp qib o'ynesiz.",
                    nasiya: "12 oy",
                    summary: "Siz uchun 2 ta pult bonus",
                    price: 599,
                    rating: 4,
                    is_aksiya: true,
                    brand_id: 5,
                    image: "/ps5.png",
                    is_liked: false
                },
                {
                    name: "Dell XPS 15 Laptop",
                    category_id: 3,
                    description: "Dell XPS 15 kuchli ishlash va mukammal ekran bilan eng yaxshi tanlov.",
                    nasiya: "3 oy",
                    summary: "Intel Core i9, 32GB RAM, 1TB SSD, NVIDIA RTX 3050 Ti.",
                    price: 17999,
                    rating: 5,
                    is_aksiya: true,
                    brand_id: 1,
                    image: "/dellxps5.png",
                    is_liked: false
                },
                {
                    name: "iPad Pro 12.9-inch (2023)",
                    category_id: 3,
                    description: "iPad Pro 12.9-inch kuchli Apple M2 chip va Liquid Retina XDR displey bilan.",
                    nasiya: "12 oy",
                    summary: "Apple Pencil qo‘llab-quvvatlashi, 5G va Face ID.",
                    price: 13999,
                    rating: 5,
                    is_aksiya: true,
                    brand_id: 5,
                    image: "/ipad12.png",
                    is_liked: false
                },
                {
                    name: "Bose QuietComfort 45",
                    category_id: 4,
                    description: "Bose QC 45 – aktiv shovqin kamaytirish bilan mukammal naushnik.",
                    nasiya: "6 oy",
                    summary: "Bluetooth 5.1, 24 soat batareya muddati, USB-C zaryadlash.",
                    price: 29999,
                    rating: 3,
                    is_aksiya: false,
                    brand_id: 6,
                    image: "/boseque.png",
                    is_liked: false
                },
                {
                    name: "Logitech MX Master 3S",
                    category_id: 7,
                    description: "Logitech MX Master 3S - eng yaxshi ergonomik sichqoncha.",
                    nasiya: "3 oy",
                    summary: "Uzoq batareya, ultra tez skroll, Bluetooth va USB-C zaryadlash.",
                    price: 999,
                    rating: 5,
                    is_aksiya: true,
                    brand_id: 7,
                    image: "/logitech.png",
                    is_liked: false
                },
                {
                    name: "Canon EOS R5 Camera",
                    category_id: 6,
                    description: "Canon EOS R5 - professional 8K video yozish imkoniyati bilan kamera.",
                    nasiya: "6 oy",
                    summary: "45MP sensor, 8K video, Dual Pixel AF II.",
                    price: 2399,
                    rating: 5,
                    is_aksiya: false,
                    brand_id: 6,
                    image: "/canon.png",
                    is_liked: false
                },
            ]);
        }
    }

    async seedBrand(): Promise<void> {
        const brandCount = await this.brandModel.count()

        if (brandCount == 0) {
            await this.brandModel.create({
                name: "Artel",
                image: "/artel.png"
            })
            await this.brandModel.create({
                name: "Samsung",
                image: "/samsung_brand.png"
            })
            await this.brandModel.create({
                name: "Nokia",
                image: "/nokia.png"
            })
            await this.brandModel.create({
                name: "Mi",
                image: "/mi.png"
            })
            await this.brandModel.create({
                name: "Apple",
                image: "/apple.png"
            })
            await this.brandModel.create({
                name: "Vivo",
                image: "/vivo.png"
            })
            await this.brandModel.create({
                name: "Huwavei",
                image: "/huwavei.png"
            })

        }
    }

    async seedBanner(): Promise<void> {
        const bannerCount = await this.bannerModel.count();
        if (bannerCount === 0) {
            await this.bannerModel.bulkCreate([
                {
                    product_id: 1,
                    description: "Orginallik va qulay narxni o'zida jamlagan Xiaomi 12 Mi Lite siz uchun eng yaxshi takliflarimizdan biridir!",
                    image: "banner_image1.png",
                    name: "Siz kutgan Xiaomi 12 Mi Lite"
                },
                {
                    product_id: 2,
                    description: "Samsung Galaxy S25 Ultra – yuqori sifatli kamera va kuchli protsessor bilan sizga ajoyib tajriba taqdim etadi.",
                    image: "s25ultra.png",
                    name: "Samsung Galaxy S25 Ultra yangiliklari"
                },
                {
                    product_id: 3,
                    description: "MacBook Pro M2 bilan samaradorlik va kreativlikni birlashtiring. 14-inch Retina displey va M2 chip.",
                    image: "macbookprom2.png",
                    name: "MacBook Pro M2 – Kuchli va Ishonchli"
                },
            ]);
        }
    }
    
    async seedProductItem(): Promise<void> {
        const productItemCount = await this.productItemModel.count();
        const productCount = await this.productModel.count();
    
        console.log(`Existing products: ${productCount}`);
        console.log(`Existing product items: ${productItemCount}`);
    
        if (productCount === 0) {
            console.error("❌ Error: No products found. Cannot insert product items.");
            return;
        }
    
        if (productItemCount == 0) {
            const productItems = [
                { price: 2999999, image: "xiamo12lite.png", product_id: 1, color_id: 1 },
                { price: 3499999, image: "s25ultra.png", product_id: 2, color_id: 2 },
                { price: 3999999, image: "macbookprom2.png", product_id: 3, color_id: 3 },
                { price: 4499999, image: "airpodspro2.png", product_id: 4, color_id: 4 },
                { price: 4999999, image: "ps5.png", product_id: 5, color_id: 5 },
                { price: 5499999, image: "dellxps5.png", product_id: 6, color_id: 1 },
                { price: 5999999, image: "ipad12.png", product_id: 7, color_id: 2 },
                { price: 6499999, image: "boseque.png", product_id: 8, color_id: 3 },
                { price: 6999999, image: "logitech.png", product_id: 9, color_id: 4 },
                { price: 7499999, image: "canon.png", product_id: 10, color_id: 5 },
            ];
    
            await this.productItemModel.bulkCreate(productItems);
        }
    }
    

    async seedColor(): Promise<void> {
        const colorCount = await this.colorModel.count();

        if (colorCount == 0) {
            const colors = [
                { name: "Red", color_code: "#FF0000" },
                { name: "Blue", color_code: "#0000FF" },
                { name: "Green", color_code: "#008000" },
                { name: "Black", color_code: "#000000" },
                { name: "White", color_code: "#FFFFFF" },
            ];

            await this.colorModel.bulkCreate(colors);
        }
    }

    async seedVariation(): Promise<void> {
        const variationCount = await this.variationModel.count();

        if(variationCount == 0) {
            const variations = [
                { name: "Hajmi",category_id: 1 },
                // Noutbuklar
                { name: "RAM", category_id: 2 },
                { name: "Hotira", category_id: 2 },
                { name: "Ekran hajmi", category_id: 2 },
                // Televizorlar
                { name: "Ekran hajmi", category_id: 3 },
                { name: "Umumiy og'irlik", category_id: 4 },
                { name: "BTU", category_id: 5 },
                // Smartfonlar
                { name: "RAM", category_id: 6 },
                { name: "Hotira", category_id: 6 },
                { name: "Ekran hajmi", category_id: 6 },
            ]

            await this.variationModel.bulkCreate(variations);
        }
    }

    async seedVariationOption(): Promise<void> {
        const variationOptionCount = await this.variationOptionModel.count();

        if(variationOptionCount == 0) {
            const variationOptions = [
                { value: "15 Kg", variation_id: 1 },
                { value: "8 GB", variation_id: 2 },
                { value: "1 TB", variation_id: 3 },
                { value: "13.3-inch", variation_id: 4 },
                { value: "42🏳‍🌈", variation_id: 1 },
                { value: "180000", variation_id: 7 },
                { value: "12", variation_id:  6},
                { value: "16 GB", variation_id: 8 },
                { value: "256", variation_id: 9},
                { value: "5.9-inch", variation_id: 10 },
            ]

            await this.variationOptionModel.bulkCreate(variationOptions);
        }
    }

    async seedProductConfiguration(): Promise<void> {
        const productConfigurationCount = await this.productConfigurationModel.count();

        if(productConfigurationCount == 0) {
            const productConfigurations = [
                { product_item_id: 3, variation_option_id: 2 },
                { product_item_id: 3, variation_option_id: 3 },
                { product_item_id: 3, variation_option_id: 4 },
                { product_item_id: 1, variation_option_id: 8 },
                { product_item_id: 1, variation_option_id: 9 },
                { product_item_id: 1, variation_option_id: 10 },
                { product_item_id: 2, variation_option_id: 8 },
                { product_item_id: 2, variation_option_id: 9 },
                { product_item_id: 2, variation_option_id: 10 },
            ]

            await this.productConfigurationModel.bulkCreate(productConfigurations);

        }
    }


}