import { Link, useLocation } from "react-router-dom"

import { MdClose } from "react-icons/md"
import { ImHome2 } from 'react-icons/im'
import { FaUserCircle } from 'react-icons/fa'
import { IoLogoGameControllerB } from 'react-icons/io'
import { HiUsers } from 'react-icons/hi'
import {IoLogIn} from 'react-icons/io5'

import styled, { keyframes } from "styled-components"
import { useContext } from "react"
import { authContext } from "context"

export const DropdownMenu = ({ onClick }) => {
    const { isLoggedIn } = useContext(authContext)
    const location = useLocation()
    return (
        <Menu>
            <CloseButton  onClick={onClick}><MdClose color='orange' size='100%'/></CloseButton>
            <Options>
                <li><Link onClick={onClick} to={'/'}><ImHome2 size={50}/></Link></li>
                <li><Link onClick={onClick} to={location.pathname !== '/catalog' ? '/catalog' : `/catalog${location.search}`}><IoLogoGameControllerB size={50}/></Link></li>
                <li><Link onClick={onClick} to={'/users'}><HiUsers size={50}/></Link></li>
                <li>{isLoggedIn ? <Link onClick={onClick} to={'/profile/bookmarks'}><FaUserCircle size={50} /></Link> :
                        <Link onClick={onClick} to={'/login/login-page'}><IoLogIn size={50} /></Link>}</li>
            </Options>
        </Menu>
       )
}

const menuShow = keyframes`
    0% {
        right: -100%
    }

    100% {
        right: 0
    }
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