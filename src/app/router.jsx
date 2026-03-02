import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import Error from "../pages/Error"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import ProtectedRoute from "../layouts/ProtectedRoute"
import { Children } from "react"
import DashboardLayout from "../layouts/DashboardLayout"


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
    },
    {
        path: "/sign-in",
        element: <SignIn />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "stock",
        element: <ProtectedRoute />,
        errorElement: <Error />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: "brands",
                        element: <div>Brands page</div>,
                    },
                    {
                        path: "firms",
                        element: <div>firms page</div>
                    },
                    {
                        path: "sales",
                        element: <div>sales page</div>
                    },
                    {
                        path: "purchases",
                        element: <div>purchases pahe</div>
                    },
                    {
                        path: "products",
                        element: <div>products page</div>
                    }
                ]
            }
        ]
    }
])