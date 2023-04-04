import styled from "styled-components"
import { NavLink, useLocation } from "react-router-dom"

export const Navigation = () => {
    const location = useLocation()
    return (
        <>
        <SiteNav>
            <NavigationMenu>
                <Item><Tab to='/'>Home</Tab></Item>
                <Item><Tab to={`/catalog${location.search}`} end>Catalog</Tab></Item>
                <Item><Tab to='/users' end>Community</Tab></Item>
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
    height: 61px; 
    padding: 0;
    margin: 0;

    display: flex;
    align-items: center;
    gap: 53px;

    font-family: 'Nunito', sans-serif;
    text-decoration: none;
`

const Item = styled.li`
    height: 100%;
    
    display: flex;
    align-items: center;
    position: relative;

    font-size: 15px;
    letter-spacing: 0.05em;
    line-height: 140%;
`

const Tab = styled(NavLink)`
&.active::after{
    content: '';
    width: 100%;
    height: 3px;
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;

    border-radius: 4px;
    background-color: #FF6600;
}
`