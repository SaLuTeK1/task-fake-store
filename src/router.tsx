import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "./layout";
import {HomePage, LogInPage, ProductInfoPage} from "./pages";
import {SavedProductsPage} from "./pages/SavedProductsPage";

const router = createBrowserRouter([
    {
        path: "",
        element: <MainLayout/>,
        children:[
            {
                index: true,
                element: <Navigate to={'/home'}/>
            },
            {
                path: "/home",
                element: <HomePage/>
            },
            {
                path:"/product-details/:id",
                element:<ProductInfoPage/>
            },
            {
                path:'/login',
                element:<LogInPage/>
            },
            {
                path:'/favourites',
                element:<SavedProductsPage/>
            }
        ]

    }
])

export {router}