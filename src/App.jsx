
import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './App.css'
import AuthLayout from './Modules/Shared/components/AuthLayout/AuthLayout'
import Login from './Modules/Authentication/components/Login/Login'
import Regiser from './Modules/Authentication/components/Register/Register'
import Changepassword from './Modules/Authentication/components/ChangePassword/Changepassword'
import Forgetpassword from './Modules/Authentication/components/ForgetPassword/Forgetpassword'
import Resetpassword from './Modules/Authentication/components/ResetPassword/Resetpassword'
import Verifyaccount from './Modules/Authentication/components/VerifyAccount/Verifyaccount'
import NotFound from './Modules/Shared/components/NotFound/NotFound'
import MasterLayout from './Modules/Shared/components/MasterLayout/MasterLayout'
import Dashboard from './Modules/Dashboard/components/Dashboard/Dashboard'
import Recipeslist from './Modules/Recipes/components/Recipeslist/Recipeslist'
import RecipesData from './Modules/Recipes/components/RecipesData/RecipesData'
import CategoriesList from './Modules/Categories/components/CategoriesList/CategoriesList'
import CategoriesData from './Modules/Categories/components/CategoriesData/CategoriesData'
import FavList from './Modules/Favourites/components/FavList/FavList'
import UserList from './Modules/Users/components/UserList/UserList'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './Modules/Shared/components/ProtectedRoute/ProtectedRoute'

function App() {

 
  const routes = createBrowserRouter([
    {
   path: '' , element:<AuthLayout/>,
   errorElement:<NotFound/>,
   children:[
    {index:true,element: <Login />},
    {path:'login',element: <Login />},
    {path:'register',element: <Regiser/>},
    {path:'change-pass',element: <Changepassword/>},
    {path:'forget-pass',element: <Forgetpassword/>},
    {path:'reset-pass',element: <Resetpassword/>},
    {path:'verify-account',element: <Verifyaccount/>},
   ]
    },
    {
 path: 'dashboard' , element: <ProtectedRoute ><MasterLayout /></ProtectedRoute>,
   errorElement:<NotFound/>,
   children:[
    {index:true,element: <Dashboard />},
    {path:'recipes',element: <Recipeslist/>},
    {path:'recipes-data/Add-recipe',element: <RecipesData/>},// addd
    {path:'recipes-data/:id?',element: <RecipesData/>},// edit
    {path:'categories',element: <CategoriesList/>},
    {path:'categories-data',element: <CategoriesData/>},
    {path:'favs',element: <FavList/>},
    {path:'users',element: <UserList/>},
   ]
    }
  ])
  return (
    <>
     <ToastContainer/>
<RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
