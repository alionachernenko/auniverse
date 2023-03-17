import { MdClose } from "react-icons/md"
import { createPortal } from "react-dom"
import styled from "styled-components"
import { NavLink } from "react-router-dom"


export const BurgerMenu = ({onClick}) => {
    return createPortal(<Menu>
            <CloseButton  onClick={() => onClick()}><MdClose color='orange' size={30}/></CloseButton>
            <ul>
                <li><Link onClick={() => onClick()} to={'/'}>Home</Link></li>
                <li><Link onClick={() => onClick()} to={'/catalog'}>Catalog</Link></li>
                <li><Link onClick={() => onClick()} to={'/users'}>Users</Link></li>
                <li><Link onClick={() => onClick()} to={'/profile'}>Profile</Link></li>

            </ul>
        </Menu>, document.querySelector('#burger-menu-root'))
}

const Menu = styled.div`
    position: absolute;
    background-color: white;
    width: auto;
    min-width: 50vw;
    top: 10px;
    right: 10px;
    padding: 10px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 1;
    border-radius: 10px;
`
const CloseButton = styled.button`
    position: absolute;
    top: 2px;
    right: 2px;
    background-color: transparent;
    border: none
`

const Link = styled(NavLink)`
    color: darkblue;
    font-size: 20px
`