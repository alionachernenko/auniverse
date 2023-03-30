import { authContext } from 'context' 

import { useContext, useState } from 'react'
import { IoMdLogIn } from 'react-icons/io'
import { Oval } from 'react-loader-spinner'

import styled from 'styled-components'
import { ShowPasswordButton } from 'components'

export const LoginForm = () => {
    const { handleLogInSubmit, isLoading } = useContext(authContext)
    const [showPassword, setShowPassword] = useState(false)


    const onFormSubmit = (e) => {
        const { email, password } = e.target
        
        handleLogInSubmit(e, email.value, password.value)
    }
    
    return (
        <Form onSubmit={(e) => onFormSubmit(e)}>
            <Icon>
                {isLoading ? <Oval color='#FF6600' secondaryColor='orange' width={40} height={40}/> : 
                <IoMdLogIn fill='orange' size='30px'/> } 
            </Icon>
            
            <Title>Sign in</Title>
              <Inputs>
                <Input type="email" name="email" placeholder="email" autocomplete="off" required />
                <div style={{ position: 'relative' }}>
                    <Input type={showPassword ? 'text' : 'password'} name="password" placeholder="password" autocomplete="off" required />
                    <ShowPasswordButton showPassword={showPassword} onClick={() => setShowPassword(prev => !prev)} />
                </div>
            </Inputs>
            <Button type="submit">Log In</Button>
        </Form>
    ) 
}

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 30px;
`


const Form = styled.form`
    height: auto;
    max-width: 100%;
    padding: 40px 20px 20px 20px;
    box-sizing: border-box;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;

    background-color: #00021A;
`

const Input = styled.input`
    width: 360px;
    padding: 14px;
    border: none;
    border-bottom: 1px solid white;
    box-sizing: border-box;

    font-family: inherit;
    font-size: 20px;
    color: white;

    background: transparent !important;
    
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
    margin-bottom: 30px;

    font-family: inherit;
    font-size: 34px;
    font-weight: 700;
    color: white;
`

const Button = styled.button`
        box-sizing: border-box;
        width: fit-content;

        border: none;
        
        position: relative;
        font-family: 'Nunito', sans-serif;
        font-size: 20px;
        color: white;
        
        
        padding: 5px 20px;
        
        background-color: orange;
        box-shadow: red 2px 3px;
        transition: 100ms all linear;
        

        &:hover {
            box-shadow: red 4px 5px;
            transform: scale(1.05);
            background-color: white;
            color: orange;
        }

       

        &::before {
            content: '';
            height: 20px;
            position: absolute;

            background-color: transparent;
            border-top: 2px solid orange;
            border-right: 2px solid orange;
            
            top: 0px;
            right: 0px;
            width: 20px;
            transition: 100ms all linear;
        }

        &::after{
            content: '';
            height: 20px;

            position: absolute;
            left: 0px;
            width: 20px;
            bottom: 0px;
            
            background-color: transparent;
            border-bottom: 2px solid orange;
            border-left: 2px solid orange;
            
            transition: 100ms all linear;
        }

        &:hover::after{
            bottom: -15px;
            left: -13px;
        }

        &:hover::before {
            top: -13px;
            right: -15px;
        }
`

const Icon = styled.div`
    width: 50px;

    border: 1px solid orange;
    border-radius: 50px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;

    top: -25px;
    height: 50px;

    background-color: white;
`

