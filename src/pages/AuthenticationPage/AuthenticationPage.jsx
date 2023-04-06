import { useContext, useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"

import { authContext } from 'context'

import styled, { keyframes } from 'styled-components';

const AuthenticationPage = () => {
    const { isLoggedIn } = useContext(authContext)
    const location = useLocation()
    
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
           navigate(`/profile/bookmarks`)
        }

        else if (location.pathname === '/login') {
            navigate('login-page')
        }
    }, [isLoggedIn, location.pathname, navigate])
    
    return (
        <Page>
            <Tabs>
                <Tab to='login-page'>Log In</Tab>
                <Tab to='signup-page'>Sign Up</Tab>
            </Tabs>
            <FormWrapper>
                <InfoBlock>
                    <p>Join the community of gamers</p>
                </InfoBlock>
                <Outlet/>
            </FormWrapper>
        </Page>
    )
}

const titleAnim = keyframes`
     0% {
        text-shadow: #FF6600 2px 5px;
     }

     25% {
        text-shadow: red 2.5px 5.5px;
     }

     50%{
        text-shadow: #FF6600 3px 6px;
     }

     75% {
        text-shadow: purple 2.5px 5.5px;
     }

     100% {
        text-shadow: #FF6600 2px 5px;
     }
`

const InfoBlock = styled.div`
width: 400px;
height: 100%;
display: flex;
align-items: center;
justify-content: center;


& p {
    color: white;
    font-size: 60px;
    line-height: 80px;
    text-shadow: purple 2px 5px;
    font-weight: 900;
    text-align: center;
    animation: ${titleAnim} 3000ms ease infinite;
    text-transform: uppercase;

    @media screen and (min-width: 1200px) {
        font-size: 70px;
        line-height: 100px;
    }
}

@media screen and (min-width: 1200px) {
        width: 500px
    }

@media screen and (max-width: 767px) {
    display: none
}
`
const Page = styled.div`
    min-height: calc(100vh - 61px);
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 100px 0;
    box-sizing: border-box;
    position: relative;
    background: rgb(15,14,15);
    background: linear-gradient(59deg, rgba(15,14,15,1) 18%, rgba(0,0,175,1) 100%);
`
const Tabs = styled.div`
    position: absolute;
    top: 20px;
    display: flex;

    & :not(:last-child) {
        margin-right: 100px;
    }

`

const Tab = styled(NavLink)`
    color: #090E2F;
    font-weight: 500;
    padding: 10px 30px;
    background-color: transparent;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    cursor: pointer;
    color: white;
    border: none;
    position: relative;
    display: block;

    &.active::after{
        position: absolute;
        width: 100%;
        display: block;
        bottom: 0;
        left: 0;
        height: 3px;
        border-radius: 4px;
        content: '';
        background-color: orange;
    }
`

const FormWrapper = styled.div`
    @media screen and (max-width: 1199px){
        max-width: 100%;
    }

    gap: 15px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    width: auto;
    border-radius: 20px;
`

export default AuthenticationPage