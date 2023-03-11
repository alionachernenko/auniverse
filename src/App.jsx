import "./App.css";
import { Homepage } from "./pages/Homepage/Homepage";
import { Catalog } from "./pages/Catalog/Catalog";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { GameDescription } from "./pages/GameDescription/GameDescription";
import { useEffect, useState } from "react";
import { Login } from "./pages/Login/Login";
import { Profile } from "./pages/Profile/Profile";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { SignupForm } from "./components/SignupForm/SignupForm";
import { ToastContainer } from "react-toastify";
import { ErrorPage } from "pages/ErrorPage/ErrorPage";
import 'react-toastify/dist/ReactToastify.css';
import { Header } from "components/Header/Header";
import { Footer } from "components/Footer/Footer";
import { auth } from "services/firebase";

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
            <Routes>
                <Route path='/auniverse' element={<Homepage />} />
                <Route path='/auniverse/catalog' element={<Catalog onSubmit={searchFormSubmit} searchParams={searchParams} />} />
                <Route path='/auniverse/catalog/:gameSlug' element={<GameDescription/>} />
                <Route path='auniverse/login' element={<Login />} >
                    <Route path='login-page' element={<LoginForm/>} />
                    <Route path='sign-page' element={<SignupForm/>} />
                </Route>

                <Route path="/auniverse/profile" element={<Profile/>} />
                <Route path='*' element={<ErrorPage/>}/>
            </Routes> 
            <Footer/>
            <ToastContainer/>
        </>
 )
}


