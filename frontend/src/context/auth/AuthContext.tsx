import { createContext } from "react"

export type AuthContextType = {
    user: any | null
    signin: (email: string, password: string) => Promise<boolean>
    signout: () => void
}

export const AuthContext = createContext<AuthContextType>(null!)