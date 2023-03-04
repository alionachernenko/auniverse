import "./App.css";
import { Homepage } from "./pages/Homepage/Homepage";
import { Catalog } from "./pages/Catalog/Catalog";
import { Route, Routes, Link, useLocation, useNavigate } from "react-router-dom";
import { GameDescription } from "./pages/GameDescription/GameDescription";
import styled from "styled-components";
import './App.css'
import { Logo } from "./components/Logo/Logo";
import { RiLoginBoxFill, RiUserFill} from 'react-icons/ri'
import { BsArrowUp } from 'react-icons/bs'
import { SearchForm } from "./components/SearchForm/SearchForm";
import { useEffect, useState } from "react";
import { Login } from "./pages/Login/Login";
import { Profile } from "./pages/Profile/Profile";
import { signUp } from "./services/firebase";
import { logIn } from "./services/firebase";
import { addUser } from "./services/firebase";
import { addGameToFavourite } from "./services/firebase";
import { removeGameFromFavourite } from "./services/firebase";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { SignupForm } from "./components/SignupForm/SignupForm";
import { toast, ToastContainer } from "react-toastify";
import { ErrorPage } from "pages/ErrorPage/ErrorPage";
import 'react-toastify/dist/ReactToastify.css';

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
        logIn(email, password).then((userCredential) => {
            const user = userCredential.user;
            const {uid} = user

            setUserId(uid)
            document.cookie = `userId=${uid}`

            localStorage.setItem('userId', JSON.stringify(uid))
            localStorage.setItem('isLoggedIn', true)
            setIsLoggedIn(true)

            navigation(`auniverse/profile`)
            setIsLoading(false)
        })
        .catch((error) => {
            const { code } = error
            toast.error(`${code.slice(5, code.length).split('-').join(' ')}`, {
                position: toast.POSITION.TOP_CENTER
            })
            setIsLoading(false)
        });
    }

    const handleSignUp = (e, email, password, username) => {
        e.preventDefault() 

        setIsLoading(true)
            signUp(email, password, username).then((userCredential) => {
                const user = userCredential.user;
                const {uid} = user

                addUser(uid, email, password, [], username)
                navigation(`/auniverse/login/login-page`)
                setIsLoading(false)
        })
        .catch((error) => {
            const { code } = error
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
            <Header>
                <Logo className={'logo_header'}>AUNIVERSE</Logo>
                {location.pathname === '/auniverse' && <SearchForm onSubmit={handleFormSubmit} className={'searchform_header'} />}
                    <nav>
                        <NavigationMenu>
                            <li><Link to='/auniverse'>Home</Link></li>
                            <li><Link to='/auniverse/catalog'>Catalog</Link></li>
                        </NavigationMenu>
                    </nav>
                <Options>
                    {isLoggedIn && <li><Link to={`/auniverse/profile`}><RiUserFill/></Link></li>}
                    {!isLoggedIn && <li><Link to={`/auniverse/login/login-page`}><RiLoginBoxFill/></Link></li>}
                    </Options>
            </Header>
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
            <Footer>
                <Logo className={'logo_footer'}>AUNIVERSE</Logo>
                <nav>
                    <ul>
                        <li><Link to='/auniverse'>Home</Link></li>
                        <li><Link to='/auniverse/catalog'>Catalog</Link></li>
                    </ul>
                </nav>
                <div><BsArrowUp fill="black" size='30'/></div>
                <address>
                    <a href="tel:+380953596448">+380953596448</a>
                    <a href='mailto:auniverse@gmail.com'>auniverse@gmail.com</a>
                </address>
            </Footer>
            <ToastContainer/>
        </>
 )
}


const Header = styled.header`
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    padding: 20px 70px;
    background-color: #080D2B;
    height: 61px;
    color: #FFFDFD;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 11111111;

    & svg{
        display: block;
        width: 100%;
        height: 100%
    }
`

const NavigationMenu = styled.ul` 
    padding: 0;
    margin: 0;
    display: flex;
    list-style: none;
    gap: 53px;
    text-decoration: none;
    font-family: 'Nunito', sans-serif;

    & li{
        font-size: 15px;
        font-style: normal;
        letter-spacing: 0.05em;
        line-height: 140%;
    }
`
const Options = styled.ul`
    padding: 0;
    margin: 0;
    display: flex;
    list-style: none;
`
// const Logo = styled.div({
//     fontWeight: 900,
//     display: 'flex',
//     alignItems: "center",
//     gap: 6,
//     fontSize: 16,
// //     '&:after': {
// //         display: 'block',
// //         content: '""',
// //         width: 9,
// //         height: 9,
// //         borderRadius: 10,
// //         backgroundColor: 'white'
// //     },
// //         '&:before': {
// //         display: 'block',
// //         content: '""',
// //         borderRight: '6px solid transparent',
// //         borderTop:' 6px solid #FFFFFF',
// //         borderLeft: '6px solid #FFFFFF',
// //         borderBottom: '6px solid #FFFFFF',
// //         borderTopLeftRadius:6,
// //         borderTopRightRadius: 6,
// //         borderBottomLeftRadius: 6,
// //         borderBottomRightRadius: 6,
// // }
// })

const Footer = styled.footer`
    height: 443.56px;
    min-height: 20px;
    display: flex;
    padding-left: 220px;
    padding-right: 220px;
    background-color: #080D2B;
    align-items: center;
    color: white;
    width: 100vw;

   

    & ul{
        list-style: none;

        & :not(:last-child){
            margin-bottom: 20px
        }
    }

    & nav{
        margin-right: 388px;
        font-family: 'Nunito', sans-serif;
        & + div{
            margin-right: 96px;
            height: 100%;
            min-height: 20;
            background-color: white;
            display: flex;
            vertical-align: middle;
            display: flex;
            align-items: center;
            width: 65px;
            justify-content: center;
        }
    }

    & address{
        display: flex;
        flex-direction: column;
        font-style: normal;
        font-family: 'Nunito', sans-serif;
    }
`