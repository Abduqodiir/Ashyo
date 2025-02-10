import React, { useState } from 'react';
import { instance } from "@/hooks/instance";
import { Pencil } from "lucide-react";

interface Address {
    id: number;
    street: string;
    region: { name: string };
    district: { name: string };
}

interface UserData {
    id: number;
    fullname: string;
    email: string;
    phone_number: string;
    image: string;
    role: string;
    is_verified: boolean;
    address: Address[];
}

interface EditProfileModalProps {
    userData: UserData;
    onUpdate: (data: UserData) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ userData, onUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullname: userData.fullname,
        email: userData.email,
        phone_number: userData.phone_number,
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        fullname: '',
        email: '',
        phone_number: ''
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            fullname: '',
            email: '',
            phone_number: ''
        };

        if (formData.fullname.trim().length < 3) {
            newErrors.fullname = 'Ism kamida 3 ta harfdan iborat bo\'lishi kerak';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Noto\'g\'ri email formati';
            isValid = false;
        }

        const phoneRegex = /^\+?[0-9]{12}$/;
        if (!phoneRegex.test(formData.phone_number)) {
            newErrors.phone_number = 'Noto\'g\'ri telefon raqam formati';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
            
            const response = await instance().put(`/users/${userId}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            onUpdate(response.data);
            alert("Profile muvaffaqiyatli yangilandi");
            setIsOpen(false);
        } catch (error: any) {
            alert(error.response?.data?.message || "Xatolik yuz berdi");
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 text-sm text-white bg-white/10 rounded-md hover:bg-white/20 transition-colors"
            >
                <Pencil className="w-4 h-4" />
                Tahrirlash
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg w-full max-w-md mx-4">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Profil ma'lumotlarini tahrirlash
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                To'liq ism
                            </label>
                            <input
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="To'liq ismingizni kiriting"
                                required
                            />
                            {errors.fullname && (
                                <p className="text-sm text-red-500 mt-1">{errors.fullname}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Email manzilingizni kiriting"
                                required
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Telefon raqam
                            </label>
                            <input
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="+998901234567"
                                required
                            />
                            {errors.phone_number && (
                                <p className="text-sm text-red-500 mt-1">{errors.phone_number}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                Bekor qilish
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Saqlanmoqda...
                                    </div>
                                ) : (
                                    "Saqlash"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;