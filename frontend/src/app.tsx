import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { LoginTripPage } from "./pages/login"
import { CreateTripPage } from "./pages/create-trip"
import { TripDetailsPage } from "./pages/trip-details"
import { AuthProvider } from "./context/auth/AuthProvider"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginTripPage  />
  },
  {
    path: "/trips",
    element: <CreateTripPage />
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage />
  },
])

export function App() {
  return <AuthProvider><RouterProvider router={router} /></AuthProvider>
}