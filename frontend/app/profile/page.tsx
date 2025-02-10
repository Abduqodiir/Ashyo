"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { instance } from "@/hooks/instance"
import { Pencil, LogOut, Mail, Phone, MapPin, Shield, CheckCircle2 } from "lucide-react"
import EditProfileModal from '@/components/EditProfileModal'

interface Address {
    id: number
    street: string
    region: { name: string }
    district: { name: string }
}

interface UserData {
    id: number
    fullname: string
    email: string
    phone_number: string
    image: string
    role: string
    is_verified: boolean
    address: Address[]
}

export default function Profile() {
    const router = useRouter()
    const [userData, setUserData] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/")
        } else {
            fetchUserData(token)
        }
    }, [router])

    const fetchUserData = async (token: string) => {
        try {
            const userId = localStorage.getItem('userId')
            const response = await instance().get(`/me/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setUserData(response.data)
        } catch (error) {
            console.error("Error fetching user data:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleProfileUpdate = (updatedData: UserData) => {
        setUserData(updatedData);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        router.push("/");
    };

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div className="text-2xl font-semibold text-gray-700 mb-4">Foydalanuvchi topilmadi</div>
                <button 
                    onClick={() => router.push("/")}
                    className="px-6 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors"
                >
                    Bosh sahifaga qaytish
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0">
                            <h1 className="text-xl font-bold text-gray-900">Profil</h1>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Chiqish
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    {/* Hero Section */}
                    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-8">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <EditProfileModal userData={userData} onUpdate={handleProfileUpdate} />
                        <div className="relative flex flex-col sm:flex-row items-center gap-6">
                            <div className="relative">
                                <Image
                                    src={"/default-avatar.png"}
                                    alt={userData.fullname}
                                    width={140}
                                    height={140}
                                    className="rounded-2xl border-4 border-white/20 shadow-xl object-cover"
                                />
                                {userData.is_verified && (
                                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-lg shadow-lg">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                )}
                            </div>
                            <div className="text-center sm:text-left">
                                <h1 className="text-3xl font-bold text-white mb-2">{userData.fullname}</h1>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-white/80">
                                        <Mail className="w-4 h-4" />
                                        <span>{userData.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/80">
                                        <Phone className="w-4 h-4" />
                                        <span>{userData.phone_number}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* Account Details */}
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <Shield className="w-5 h-5 text-indigo-600" />
                                    <h2 className="text-xl font-semibold text-gray-900">Hisob ma'lumotlari</h2>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Role</span>
                                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                            {userData.role}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Status</span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            userData.is_verified 
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                            {userData.is_verified ? "Tasdiqlangan" : "Tasdiqlanmagan"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Addresses */}
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <MapPin className="w-5 h-5 text-indigo-600" />
                                    <h2 className="text-xl font-semibold text-gray-900">Manzillar</h2>
                                </div>
                                <div className="space-y-4">
                                    {userData.address.map((addr) => (
                                        <div 
                                            key={addr.id} 
                                            className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-indigo-200 transition-colors"
                                        >
                                            <p className="text-gray-900 font-medium mb-1">{addr.street}</p>
                                            <p className="text-gray-500 text-sm">
                                                {addr.district.name}, {addr.region.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}