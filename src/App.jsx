import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";

import { Header } from "components/Header/Header";
import { Footer } from "components/Footer/Footer";
import { LoadingPage } from "components/LoadingPage/LoadingPage";
import { SignupForm } from "components/SignupForm/SignupForm";
import { LoginForm } from 'components/LoginForm/LoginForm';

const Homepage = lazy(() => import('./pages/Homepage/Homepage'))
const Catalog = lazy(() => import('./pages/Catalog/Catalog'))
const GameDescription = lazy(() => import('./pages/GameDescription/GameDescription'))
const AuthenticationPage = lazy(() => import('./pages/AuthenticationPage/AuthenticationPage'))
const AccountPage = lazy(() => import('./pages/AccountPage/AccountPage'))
const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage'))
const UserProfile = lazy(() => import('./pages/UserProfile/UserProfile'))
const Users = lazy(() => import('./pages/Users/Users'))

export function App() {
    const [searchParams, setSearchParams] = useState({
        value: '', ordering: null, genre: null
    })

    const navigate = useNavigate()
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
        
        navigate('/catalog')
    }

    return (
        <>
            <Header onSubmit={searchFormSubmit}/>
            <Suspense fallback={<LoadingPage/>}>
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/catalog' element={<Catalog onSubmit={searchFormSubmit} searchParams={searchParams} />} />
                <Route path='/catalog/:gameSlug' element={<GameDescription/>} />
                <Route path='/login' element={<AuthenticationPage />} >
                    <Route path='login-page' element={<LoginForm/>} />
                    <Route path='signup-page' element={<SignupForm/>} />
                </Route>
                <Route path ='/users' element={<Users/>}/>
                <Route path='/users/:id/*' element={<UserProfile />}/>
                <Route path="/profile/*" element={<AccountPage />}/>
                <Route path='*' element={<ErrorPage/>}/>
            </Routes> 
            </Suspense>
            <Footer/>
            <ToastContainer/>
        </>
 )
}


