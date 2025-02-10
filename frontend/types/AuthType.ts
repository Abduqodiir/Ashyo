

export interface SignInType {
    email: string,
    password: string
}

export interface SignUpType {
    fullname: string,
    email: string,
    password: string
}

export interface ActionItem {
    id: number
    bageCount: number | string | null
    icon: React.ReactNode
    path: string
}

export interface AuthFormData {
    fullname?: string
    email: string
    password: string
}
