import styled from "styled-components"
import { NavLink } from "react-router-dom"

export const Navigation = () => {

    return (
        <>
        <SiteNav>
            <NavigationMenu>
                <li><Tab to='/'>Home</Tab></li>
                <li><Tab to='/catalog'>Catalog</Tab></li>
                <li><Tab to='/users'>Users</Tab></li>
            </NavigationMenu>
        </SiteNav>
        </>
    )
}

const SiteNav = styled.nav`
    @media screen and (max-width: 1199px){
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