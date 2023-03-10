import { useContext } from "react"
import authContext from '../../context/context'
import { Link } from "react-router-dom"
import {RiUserFill, RiLoginBoxFill} from 'react-icons/ri'
import styled from "styled-components"

export const Navigation = () => {
    const {isLoggedIn} = useContext(authContext)

    return (
        <>
        <SiteNav>
            <NavigationMenu>
                <li><Link to='/auniverse'>Home</Link></li>
                <li><Link to='/auniverse/catalog'>Catalog</Link></li>
            </NavigationMenu>
        </SiteNav>
            <Options>
                {isLoggedIn && <li><Link to={`/auniverse/profile`}><RiUserFill/></Link></li>}
                {!isLoggedIn && <li><Link to={`/auniverse/login/login-page`}><RiLoginBoxFill/></Link></li>}
            </Options>
        </>
    )
}

const SiteNav = styled.nav`
    @media screen and (max-width: 1440px){
        display: none;
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
    };

`

const Options = styled.ul`
    padding: 0;
    margin: 0;
    display: flex;
    list-style: none;

    @media screen and (max-width: 1200px){
        display: none;
    }
`