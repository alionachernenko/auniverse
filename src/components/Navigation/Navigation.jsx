import { useContext } from "react"
import authContext from '../../context/context'
import { Link, NavLink } from "react-router-dom"
import {RiUserFill, RiLoginBoxFill} from 'react-icons/ri'
import styled from "styled-components"

export const Navigation = () => {
    const {isLoggedIn} = useContext(authContext)

    return (
        <>
        <SiteNav>
            <NavigationMenu>
                <li><Tab to='/'>Home</Tab></li>
                <li><Tab to='/catalog'>Catalog</Tab></li>
                <li><Tab to='/users'>Users</Tab></li>
            </NavigationMenu>
        </SiteNav>
            <Options>
                {isLoggedIn && <li><Link to={`/profile`}><RiUserFill/></Link></li>}
                {!isLoggedIn && <li><Link to={`/login/login-page`}><RiLoginBoxFill/></Link></li>}
            </Options>
        </>
    )
}

const SiteNav = styled.nav`
    @media screen and (max-width: 1439px){
        display: none;
    }
`

const NavigationMenu = styled.ul` 
    padding: 0;
    margin: 0;
    display: flex;
    height: 61px;
    list-style: none;
    align-items: center;
    gap: 53px;
    text-decoration: none;
    font-family: 'Nunito', sans-serif;

    & li{
        font-size: 15px;
        font-style: normal;
        letter-spacing: 0.05em;
        line-height: 140%;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
    };

`

const Tab = styled(NavLink)`
    
&.active::after{
    position: absolute;
    width: 100%;
    display: block;
    bottom: 0;
    left: 0;
    height: 3px;
    border-radius: 4px;
    content: '';
    background-color: #FF6600;
}
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