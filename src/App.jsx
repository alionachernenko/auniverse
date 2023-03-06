import "./App.css";
import { Homepage } from "./pages/Homepage/Homepage";
import { Catalog } from "./pages/Catalog/Catalog";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { GameDescription } from "./pages/GameDescription/GameDescription";
import { useEffect, useState } from "react";
import { Login } from "./pages/Login/Login";
import { Profile } from "./pages/Profile/Profile";
import { signUp, logIn, addUser, addGameToFavourite, removeGameFromFavourite} from "./services/firebase";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { SignupForm } from "./components/SignupForm/SignupForm";
import { toast, ToastContainer } from "react-toastify";
import { ErrorPage } from "pages/ErrorPage/ErrorPage";
import 'react-toastify/dist/ReactToastify.css';
import { Header } from "components/Header/Header";
import { Footer } from "components/Footer/Footer";

export function App() {
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('userId')))
    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        if (JSON.parse(localStorage.getItem('isLoggedIn'))) {
            return JSON.parse(localStorage.getItem('isLoggedIn'))
        }
        else return false
    })

    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [ordering, setOrdering] = useState('added')
    const [genre, setGenre] = useState('action')
    
    const navigation = useNavigate()
    const location = useLocation();

    useEffect(() => {
         window.scroll({
            top: 0,
        })
    }, [location.pathname])

    const handleFormSubmit = (e, value, ordering, genre) => {
        e.preventDefault()

        setQuery(value)
        setOrdering(ordering)
        setGenre(genre)
        setPage(1)
        navigation('/auniverse/catalog')
    }

    const handleLogInSubmit = (e, email, password) => {
        e.preventDefault()

        setIsLoading(true)
        logIn(email, password).then(({user}) => {
            const {uid} = user
            
            setUserId(uid)

            localStorage.setItem('userId', JSON.stringify(uid))
            localStorage.setItem('isLoggedIn', true)
            setIsLoggedIn(true)

            navigation(`auniverse/profile`)
            setIsLoading(false)
        })
        .catch(({code}) => {
            toast.error(`${code.slice(5, code.length).split('-').join(' ')}`, {
                position: toast.POSITION.TOP_CENTER
            })
            setIsLoading(false)
        });
    }

    const handleSignUp = (e, email, password, username) => {
        e.preventDefault() 

        setIsLoading(true)
            signUp(email, password, username).then(({user}) => {
                const {uid} = user

                addUser(uid, email, password, [], username)
                navigation(`/auniverse/login/login-page`)
                setIsLoading(false)
        })
        .catch(({code}) => {
            toast.error(`${code.slice(5, code.length).split('-').join(' ')}`, {
                position: toast.POSITION.TOP_CENTER
            })
            setIsLoading(false)
        });
    }

    const addToFavs = (slug, gameData) => {
        addGameToFavourite(userId, slug, gameData)
    }

    const removeFromFavs = (gameSlug) => {
        removeGameFromFavourite(userId, gameSlug)
    }

    return (
        <>
            <Header isLoggedIn={isLoggedIn} onSubmit={handleFormSubmit} location={location} />
            <Routes>
                <Route path='/auniverse' element={<Homepage />} />
                <Route path='/auniverse/catalog' element={<Catalog onSubmit={handleFormSubmit} page={page} query={query} setPage={setPage} ordering={ordering} genre={genre} />} />
                <Route path='/auniverse/catalog/:gameSlug' element={<GameDescription isLoggedIn={isLoggedIn} addToFavs={addToFavs} removeFromFavs={removeFromFavs} userId={userId} />} />
                <Route path='auniverse/login' element={<Login userId={userId} />} >
                    <Route path='login-page' element={<LoginForm onSubmit={handleLogInSubmit} isLoading={isLoading} />} />
                    <Route path='sign-page' element={<SignupForm onSignUp={handleSignUp} isLoading={isLoading}/>} />
                </Route>

                <Route path="/auniverse/profile" element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path='*' element={<ErrorPage/>}/>
            </Routes> 
            <Footer/>
            <ToastContainer/>
        </>
 )
}


