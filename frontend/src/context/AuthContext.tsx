import { createContext } from "react"
import { Trip } from "../model/model";

export type AuthContextType = {
    user: any | null
    listTripsOwner: any |null
    listTrips: any |null
    signin: (email: string, password: string) => Promise<boolean>
    signout: () => void
}

export const AuthContext = createContext<AuthContextType>(null!)