import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { authSevice } from "../services/auth"
import { Trip, User } from "../model/model";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null)
    const [listTripsOwner, setlistTripsOwner] = useState<Trip[]>([]);
    const [listTrips, setlistTrips] = useState<Trip[]>([]);
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
                setTrips(data.user.email)
            }
        }
    }
    const signin = async (email: string, password: string) => {
        const data = await auth.signin(email, password)
        if (data.user && data.token) {
            setUser(data.user)
            setToken(data.token)
            setTrips(data.user.email)
            return true
        }
        return false
    }
    const signout = () => {
        if (auth.logout()) {
            setUser(null)
            setToken('')
        }

    }
    const setToken = (token: string) => {
        localStorage.setItem('authToken', token)
    }
    const setTrips = async (email: string) => {
        setlistTripsOwner(await auth.listTripsOwner(email))
        setlistTrips(await auth.listTrips(email))
        console.log("setTrips:",listTripsOwner," X ",listTrips)
    };

    return (
        <AuthContext.Provider value={{ user, listTripsOwner, listTrips, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}