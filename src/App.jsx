import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Header } from "components/Header/Header";
import { Footer } from "components/Footer/Footer";
import { lazy, Suspense } from "react";
import { LoadingPage } from "components/LoadingPage/LoadingPage";

const Homepage = lazy(() => import('./pages/Homepage/Homepage'))
const Catalog = lazy(() => import('./pages/Catalog/Catalog'))
const GameDescription = lazy(() => import('./pages/GameDescription/GameDescription'))
const Login = lazy(() => import('./pages/Login/Login'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage'))
const LoginForm = lazy(() => import('./components/LoginForm/LoginForm'))
const SignupForm = lazy(() => import('./components/SignupForm/SignupForm'))
const User = lazy(() => import('./components/User/User'))
const Users = lazy(() => import('./pages/Users/Users'))

export function App() {
    const [searchParams, setSearchParams] = useState({
        value: '', ordering: 'added', genre: 'action'
    })

    const navigation = useNavigate()
    const location = useLocation();

    useEffect(() => {
         window.scroll({
            top: 0,
        })
    }, [location.pathname])

    
    const searchFormSubmit = (e, value, ordering, genre) => {
        e.preventDefault()

        setSearchParams(
            {value, ordering, genre}
        )
        
        navigation('/auniverse/catalog')
    }

    return (
        <>
            <Header onSubmit={searchFormSubmit}/>
            <Suspense fallback={<LoadingPage/>}>
            <Routes>
                <Route path='/auniverse' element={<Homepage />} />
                <Route path='/auniverse/catalog' element={<Catalog onSubmit={searchFormSubmit} searchParams={searchParams} />} />
                <Route path='/auniverse/catalog/:gameSlug' element={<GameDescription/>} />
                <Route path='auniverse/login' element={<Login />} >
                    <Route path='login-page' element={<LoginForm/>} />
                    <Route path='sign-page' element={<SignupForm/>} />
                </Route>
                <Route path ='/auniverse/users' element={<Users/>}/>
                <Route path='/auniverse/users/:id' element={<User/>}/>
                <Route path="/auniverse/profile" element={<Profile/>} />
                <Route path='*' element={<ErrorPage/>}/>
            </Routes> 
            </Suspense>
            <Footer/>
            <ToastContainer/>
        </>
 )
}


