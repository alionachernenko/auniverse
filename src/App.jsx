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
import { useState } from "react";
import { Login } from "./pages/Login/Login";
import { Profile } from "./pages/Profile/Profile";
import { signUp } from "./services/firebase";
import { logIn } from "./services/firebase";
import { addUser } from "./services/firebase";
import { addToFavsMovs } from "./services/firebase";
import { removeFromFavsGames } from "./services/firebase";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { SignupForm } from "./components/SignupForm/SignupForm";

function App() {
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('')
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        if (JSON.parse(localStorage.getItem('isLoggedIn'))) {
            return JSON.parse(localStorage.getItem('isLoggedIn'))
        }
        else return false
    })
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('userId')))
    const navigation = useNavigate()

    
    const handleFormSubmit = (e, value) => {
        console.log('submit')
        e.preventDefault()
        setQuery(value)
        setPage(1)
        navigation('/auniverse/catalog')
    }

    const handleLogInSubmit = (e, email, password) => {
        e.preventDefault()

        logIn(email, password).then((userCredential) => {
            const user = userCredential.user;
            setUserId(user.uid)
            localStorage.setItem('userId', JSON.stringify(user.uid))
            setIsLoggedIn(true)
            navigation(`/${user.uid}/profile`)
        })
        .catch((error) => {
            console.log(error.code)

        });
        localStorage.setItem('isLoggedIn', true)
    }

    const handleSignUp = (e, email, password) => {
        e.preventDefault()
            signUp(email, password).then((userCredential) => {
                const user = userCredential.user;
                addUser(user.uid, email, password, [])
                
        })
        .catch((error) => {
            console.log(error)
        });
    }

    const addToFavs = (slug, gameData) => {
        addToFavsMovs(userId, slug, gameData)
    }

    const removeFromFavs = (gameSlug) => {
        removeFromFavsGames(userId, gameSlug)
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
                    {isLoggedIn && <li><Link to={`/auniverse/${userId}/profile`}><RiUserFill/></Link></li>}
                    {!isLoggedIn && <li><Link to={`/auniverse/login/login-page`}><RiLoginBoxFill/></Link></li>}
                    </Options>
            </Header>
            <Routes>
                <Route path='/auniverse' element={<Homepage />} />
                <Route path='/auniverse/catalog' element={<Catalog onSubmit={handleFormSubmit} page={page} query={query} setPage={setPage} setQuery={setQuery} />} />
                <Route path='/auniverse/catalog/:gameSlug' element={<GameDescription isLoggedIn={isLoggedIn} addToFavs={addToFavs} removeFromFavs={removeFromFavs} userId={userId} />} />
                <Route path='auniverse/login' element={<Login userId={userId} />} >
                    <Route path='login-page' element={<LoginForm onSubmit={handleLogInSubmit} />} />
                    <Route path='sign-page' element={<SignupForm onSignUp={handleSignUp}/>} />
                </Route>

                <Route path="auniverse/:userId/profile" element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
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
        </>
 )
}

export default App;

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