import styled from "styled-components"
import { RiUserFill, RiLoginBoxFill } from 'react-icons/ri'

import {authContext} from 'context'

import { useContext } from "react"
import { NavLink } from "react-router-dom"

export const ProfileButton = () => {
    const {isLoggedIn} = useContext(authContext)
    
    return (
        <>
            {isLoggedIn ? <Button to={`/profile/bookmarks`}><RiUserFill size={23}/></Button> : 
            <Button to={`/login`}><RiLoginBoxFill size={23}/></Button>}
        </>
    )
    
}

const Button = styled(NavLink)`
    @media screen and (max-width: 1200px){
        display: none;
    }

    position: relative;
    height: 61px;
    display: flex;
    align-items: center;
    

    & svg {
        transition: 180ms all ease;
    }

    &:hover svg{
        transform: scale(1.2)
    }

    &.active::after{
            content: '';
            width: 100%;
            height: 3px;
            display: block;
            position: absolute;
            bottom: 0;
            border-radius: 4px;
            background-color: #FF6600;
        }
`

