import { MdClose } from "react-icons/md"
import { ImHome2 } from 'react-icons/im'
import {FaUserCircle} from 'react-icons/fa'
import { IoLogoGameControllerB } from 'react-icons/io'
import {HiUsers} from 'react-icons/hi'
import { createPortal } from "react-dom"
import styled, { keyframes } from "styled-components"
import { NavLink } from "react-router-dom"


export const DropdownMenu = ({ onClick }) => {
    return createPortal(
        <Backdrop onClick={(e) => {
            if(e.target === e.currentTarget) onClick()
        }}>
        <Menu>
            <CloseButton  onClick={() => onClick()}><MdClose color='orange' size='100%'/></CloseButton>
            <ul>
                <li><Link onClick={() => onClick()} to={'/'}><ImHome2 size={50}/></Link></li>
                <li><Link onClick={() => onClick()} to={'/catalog'}><IoLogoGameControllerB size={50}/></Link></li>
                <li><Link onClick={() => onClick()} to={'/users'}><HiUsers size={50}/></Link></li>
                <li><Link onClick={() => onClick()} to={'/profile'}><FaUserCircle size={50}/></Link></li>

            </ul>
            </Menu>
        </Backdrop>, document.querySelector('#burger-menu-root'))
}

const menuShow = keyframes`
    0% {
        right: -100%
    }

    100% {
        right: 0
    }
`

const backdropShow = keyframes`
    0% {
        opacity: 0
    }

    100% {
        opacity: 1
    }
`

const Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    box-sizing: border-box;
    z-index: 1;
    // opacity: 0$
    animation: ${backdropShow} 200ms ease;
    
    padding: 20px
   
`
const Menu = styled.div`
    position: absolute;
    overflow: hidden;
    padding: 20px;
    background-color:  #00021A;
    right: 20px;
    height: auto;
    border-radius: 20px;
    animation: ${menuShow} 100ms ease;

    & ul {
        display: flex;
    flex-direction: column;
    align-items: flex-end;
    }

`
const CloseButton = styled.button`
    position: absolute;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    top: 0;
    right: 0;
    background-color: white;
    border: orange;
`

const Link = styled(NavLink)`
    color: white;
    font-size: 80px;
    font-weight: 500;
    text-align: end;
`