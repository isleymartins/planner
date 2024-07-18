import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import axios from "axios"

export const authSevice = () => ({
    validateToken: async (token: string) => {
        return {
             user: {
                 "id": 1,
                 "name": "irlla",
                 "email": "irlla@gmail.com",
                 "password": "123"
             },
         }
       /*  const response = await axios.post("/validate", { token: token })
         return { user: {...response.data } }*/
    },
    signin: async (email: string, password: string) => {
         return {
             user: {
                 "id": 1,
                 "name": "irlla",
                 "email": "irlla@gmail.com",
                 "password": "123"
             },
             token: "123123123"
         }
       /* const response = await axios.post("/signin", { email, password })
        return response.data*/
    },
    logout: async () => {
        return { status: true }
        const response = await axios.post("/logout")
        return response.data

    }
})

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<  any| null>(null)
    const auth = authSevice()

    useEffect(()=>{
        validateToken()
    },[])

    const validateToken = async () =>{
        const storageData = localStorage.getItem('authToken')
        if(storageData){
            const data = await auth.validateToken(storageData)
            if(data.user){
                setUser(data.user)
            }
        }
    }
    const setToken = (token:string) =>{
        localStorage.setItem('authToken',token)
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
    const signout = async () => {
        await auth.logout()
        setUser(null)
        setToken('')
    }
   
    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}