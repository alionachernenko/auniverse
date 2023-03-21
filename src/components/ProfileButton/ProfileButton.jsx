import styled from "styled-components"
import { RiUserFill, RiLoginBoxFill } from 'react-icons/ri'

import {authContext} from '../../context/context'

import { useContext } from "react"
import { Link } from "react-router-dom"

export const ProfileButton = () => {
    const {isLoggedIn} = useContext(authContext)
    
    return (
        <>
            {isLoggedIn ? <Button to={`/profile`}><RiUserFill/></Button> : 
            <Button to={`/login/login-page`}><RiLoginBoxFill/></Button>}
        </>
    )
    
}

const Button = styled(Link)`
    @media screen and (max-width: 1200px){
        display: none;
    }
`

