import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { CreateTripPage } from "./pages/create-trip"
import { TripDetailsPage } from "./pages/trip-details"
import { TravelRoom } from "./pages/travel-room"
import { AuthProvider } from "../src/context/AuthProvider"
import { RequireAuth } from "../src/context/private"
import { LoginTripPage } from "./pages/login"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginTripPage />
  },

  {
    path: "/trips",
    element: <RequireAuth><CreateTripPage /></RequireAuth>
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage />
  }, {
    path: "/user",
    element: <RequireAuth><TravelRoom /></RequireAuth>
  },
])

export function App() {
  return <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
}