import { api } from "./axios"


export const authSevice = () => ({
    validateToken: async (token: string) => {
        const response = await api.post(`/validate`, { token: token })

        return { user: { ...response.data } }
    },
    signin: async (email: string, password: string) => {
        const response = await api.post("/login", { email, password })
        return response.data
    },
    logout: () => {
        return true
    },
    listTripsOwner: async (email: string) => {
        const response = await api.get(`/trips?email=${email}`)
        return response.data
    },
    listTrips: async (email: string) => {
        const response = await api.get(`/trips/participants?email=${email}`)
        return response.data
    }
})