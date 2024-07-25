import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { authSevice } from "../services/auth"

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<any>(null)
    const auth = authSevice()

    useEffect(() => {
        validateToken()
    }, [])

    const validateToken = async () => {
        const storageData = localStorage.getItem('authToken')
        if (storageData) {
            const data = await auth.validateToken(storageData)
            if (data.user) {
                setUser(data.user)
            }
        }
    }
    const signin = async (email: string, password: string) => {
        const data = await auth.signin(email, password)
        if (data.user && data.token) {
            setUser(data.user)
            setToken(data.token)
            return true
        }
        return false
    }
    const signout =  () => {
        if (auth.logout()) {
            setUser(null)
            setToken('')
        }

    }
    const setToken = (token: string) => {
        localStorage.setItem('authToken', token)
    }
    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}