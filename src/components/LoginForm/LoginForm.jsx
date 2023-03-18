import { useContext } from 'react'
import { IoMdLogIn } from 'react-icons/io'
import { Oval } from 'react-loader-spinner'
import authContext from '../../context/context' 
import styled from 'styled-components'

const LoginForm = () => {
    const { handleLogInSubmit, isLoading } = useContext(authContext)
    
    return (
        <Form onSubmit={(e) => handleLogInSubmit(e, e.target.elements.email.value, e.target.elements.password.value)}>
            <Icon>
                {isLoading ? <Oval color='#FF6600' secondaryColor='orange' width={40} height={40} strokeWidth={4} /> : 
                <IoMdLogIn fill='orange' size='30px'/> } 
            </Icon>
            
            <Title>Sign in</Title>
            <Input type="email" name="email" placeholder='email' required autocomplete="off"/>
            <Input type="password" name="password" placeholder="password" required autocomplete="off"/>
                
            <Button type="submit">Log In</Button>
        </Form>
    ) 
}

const Form = styled.form`
    display: flex;
    height: 100%;
    flex-direction: column; 
    background-color: #00021A;
    padding: 35px 20px 20px 20px;
    align-items: center;
    position: relative;
    justify-content: center;
    box-sizing: border-box;

    @media screen and (max-width: 1199px) {
        max-width: 100%;
        border-radius: 20px;
        height: auto;
        padding: 40px 20px;
    }
`

const Input = styled.input`
    padding: 14px;
    width: 360px;
    color: white;
    font-family: inherit;
    font-size: 20px;
    border: none;
    margin-bottom: 30px;
    background: transparent !important;
    border-bottom: 1px solid white;
    -webkit-box-shadow: inset 0 0 0 50px #00021A;
    -webkit-text-fill-color: #ffffff;

    &::placeholder{
        font-size: 20px;
    }

    @media screen and (max-width: 1199px){
        width: 100%
    }
`

const Title = styled.h2`
    font-size: 34px;
    margin-bottom: 30px;
    font-family: inherit;
    font-weight: 700;
    color: white;
`

const Button = styled.button`
    background-color: #FF6600;
    color: white;
    text-transform: uppercase;
    font-family: inherit;
    padding: 11px 40px;
    border: none;
    cursor: pointer;
    border-radius: 15px;
`

const Icon = styled.div`
    position: absolute;
    top: -25px;
    height: 50px;
    width: 50px;
    background-color: white;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid orange;
`

export default LoginForm