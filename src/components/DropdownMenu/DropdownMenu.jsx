import { Link } from "react-router-dom"
import { createPortal } from "react-dom"

import { MdClose } from "react-icons/md"
import { ImHome2 } from 'react-icons/im'
import { FaUserCircle } from 'react-icons/fa'
import { IoLogoGameControllerB } from 'react-icons/io'
import { HiUsers } from 'react-icons/hi'
import {IoLogIn} from 'react-icons/io5'

import styled, { keyframes } from "styled-components"
import { useContext } from "react"
import { authContext } from "context/context"

export const DropdownMenu = ({ onClick }) => {
    const {isLoggedIn} = useContext(authContext)
    return createPortal(
        <Backdrop onClick={(e) => {
            if (e.target === e.currentTarget) {
                onClick()
            }
        }}>
        <Menu>
            <CloseButton  onClick={onClick}><MdClose color='orange' size='100%'/></CloseButton>
            <Options>
                <li><Link onClick={onClick} to={'/'}><ImHome2 size={50}/></Link></li>
                <li><Link onClick={onClick} to={'/catalog'}><IoLogoGameControllerB size={50}/></Link></li>
                <li><Link onClick={onClick} to={'/users'}><HiUsers size={50}/></Link></li>
                    <li><Link onClick={onClick} to={'/profile/bookmarks'}>{isLoggedIn ? <FaUserCircle size={50} /> : <IoLogIn size={50} />}</Link></li>
            </Options>
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
    padding: 20px;

    box-sizing: border-box;

    position: fixed;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
    
    animation: ${backdropShow} 200ms ease;
`
const Menu = styled.div`
    height: auto;
    padding: 20px;
    position: absolute;
    right: 20px;

    border-radius: 20px;
    overflow: hidden;
    
    background-color:  #00021A;
    animation: ${menuShow} 100ms ease;
`

const Options = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 30px;
    gap: 20px;
`

const CloseButton = styled.button`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    right: 0;

    background-color: white;
    border: orange;
`