import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { LoginTripPage } from "../../pages/login"

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  
    const auth = useContext(AuthContext)
    if (!auth.user) {
        return <LoginTripPage />
    }
    return children
}