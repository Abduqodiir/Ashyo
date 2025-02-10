"use client"

import Modal from "@/components/Modal"
import { BasketCartIcon, CompareIcon, LikeIcon, ProfileIcon } from "@/icons"
import Image from "next/image"
import { type FormEvent, useContext, useState, useCallback, useEffect } from "react"
import { SignIn, SignUp } from "./Auth"
import { auth } from "@/service/auth"
import { Context } from "@/context/Context"
import toast, { Toaster } from "react-hot-toast"
import { getLikes } from "@/service/getLikes"
import { getCarts } from "@/service/getCarts"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ActionItem, AuthFormData } from '@/types/AuthType'

const Actions = () => {
    const router = useRouter()
    const { likeList } = getLikes()
    const { cartList } = getCarts()
    const { setToken } = useContext(Context)

    const [isLoading, setIsLoading] = useState(false)
    const [authStatus, setAuthStatus] = useState<"sign_in" | "sign_up">("sign_in")
    const [profileModal, setProfileModal] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        setIsAuthenticated(!!token)
    }, [])

    const actionList: ActionItem[] = [
        {
            id: 1,
            bageCount: 2,
            icon: <CompareIcon />,
            path: "",
        },
        {
            id: 2,
            bageCount: likeList?.length || "",
            icon: <LikeIcon />,
            path: "/like",
        },
        {
            id: 3,
            bageCount: cartList?.length || 0,
            icon: <BasketCartIcon />,
            path: "/cart",
        },
        {
            id: 4,
            bageCount: null,
            icon: <ProfileIcon />,
            path: isAuthenticated ? "/profile" : "",
        },
    ]

    const handleActionClick = useCallback(
        (id: number) => {
            if (id === 4) {
                if (isAuthenticated) {
                    router.push("/profile")
                } else {
                    setProfileModal(true)
                }
            }
        },
        [isAuthenticated, router],
    )

    const handleAuthSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const form = e.target as HTMLFormElement
            const formData: AuthFormData = {
                email: form.email.value,
                password: form.password.value,
                ...(authStatus === "sign_up" && { fullname: form.fullname.value }),
            }

            const result = await auth(authStatus, formData, setToken)

            if (result?.status === 201 || result?.status === 200) {
                toast.success(authStatus === "sign_in" ? "Successfully logged in!" : "Successfully registered!")
                form.reset()

                if (authStatus === "sign_in") {
                    setProfileModal(false)
                    setIsAuthenticated(true)
                    localStorage.setItem("token", result.data.accessToken)
                    router.push("/profile")
                } else {
                    setAuthStatus("sign_in")
                }
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.")
            console.error("Auth error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const renderBadge = (count: number | string | null) => {
        if (!count || count === 0) return null

        return (
            <div className="absolute w-[20px] h-[20px] bg-[#E81504] text-white font-bold text-[10px] flex items-center justify-center rounded-full -top-[10px] -right-[10px]">
                {count}
            </div>
        )
    }

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />

            <nav className="hidden sm:flex gap-[15px]" aria-label="User actions">
                {actionList.map(({ id, bageCount, icon, path }) => (
                    <div
                        key={id}
                        onClick={() => handleActionClick(id)}
                        className="w-[50px] h-[48px] relative cursor-pointer bg-[#EBEFF3] hover:bg-[#E2E8ED] rounded-[6px] flex items-center justify-center transition-colors"
                    >
                        {path ? (
                            <Link href={path} className="flex items-center justify-center w-full h-full">
                                {icon}
                            </Link>
                        ) : (
                            icon
                        )}
                        {renderBadge(bageCount)}
                    </div>
                ))}
            </nav>

            <Modal modalClass="!h-[420px]" open={profileModal} setOpen={setProfileModal} aria-label="Authentication modal">
                <div className="flex items-center mt-[20px] justify-center">
                    <Image
                        style={{ width: "50px", height: "80px" }}
                        className="scale-[1.6]"
                        src="/logo.svg"
                        alt="Site Logo"
                        width={50}
                        height={80}
                        priority
                    />
                    <span className="text-[#0F4A97] font-bold text-[29px]">Ashyo</span>
                </div>

                <div className="flex mt-2 items-center justify-center gap-5">
                    {["sign_in", "sign_up"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setAuthStatus(status as "sign_in" | "sign_up")}
                            className={`text-[20px] text-[#0F4A97] font-semibold border-b-[2px] pb-1 ${authStatus === status ? "border-[#0F4A97]" : "border-transparent"
                                }`}
                        >
                            {status === "sign_in" ? "Sign In" : "Sign Up"}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleAuthSubmit} className="px-5 mt-5 space-y-2">
                    {authStatus === "sign_in" ? <SignIn isLoading={isLoading} /> : <SignUp isLoading={isLoading} />}
                </form>
            </Modal>
        </>
    )
}

export default Actions

