import { useContext } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { Oval } from 'react-loader-spinner'
import { authContext } from 'context'
import { useState } from 'react'
import styled from 'styled-components'
import { ShowPasswordButton } from 'components'


export const SignupForm = () => {
    const { handleSignUp, isLoading } = useContext(authContext)
    const [showPassword, setShowPassword] = useState(false)
    

    return (
        <Form onSubmit={(e) => {
            const { email, password, username } = e.target.elements
            handleSignUp(e, email.value, password.value, username.value)
        }
        }>
            <Icon className='icon-wrapper'>
                {isLoading ? <Oval color='#FF6600' secondaryColor='orange' width={40} height={40} strokeWidth={4} /> : 
                <FaUserEdit className='icon' fill='orange' size='30px'/> } 
            </Icon>
            <Title>Sign up</Title>
            <Inputs>
                <div style={{ position: 'relative' }}>
                    <Input type="email" name="email" placeholder="email" autocomplete="off" required />
                    <ValidationMessage className='email'>
                        Provide a valid email (ex: john@company.com)
                    </ValidationMessage>
                </div>
                <div style={{ position: 'relative' }}>
                    <Input type={showPassword ? 'text' : 'password'} name="password" placeholder="password"
                        autocomplete="off" required minLength={8}/>
                    <ValidationMessage className='password'>
                        Password must contain minimum
                        eight characters, at least one
                        uppercase letter, one lowercase
                        letter and one number
                    </ValidationMessage>
                    <ShowPasswordButton showPassword={showPassword} onClick={() => setShowPassword(prev => !prev)} />
                </div>
                <div style={{ position: 'relative' }}>
                <Input type="text" name="username" placeholder="username" autocomplete="off" required minLength={4} />
                    <ValidationMessage className='username'>
                    Username must contain at least 4 symbols
                    </ValidationMessage>
                </div>
            </Inputs>       
            <Button type="submit">Sign Up</Button>
        </Form>
    )
}

const ValidationMessage = styled.p`
    opacity: 0;
    color: white;
    position: absolute;
    top: 100%;
    padding: 5px;
    border-radius: 10px;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    pointer-events: none;
    transition: 250ms all ease;
    z-index: 11111;
    margin-right: -50%;
    background-color: #EF5959;

    @media screen and (min-width: 1200px) {
        font-size: 15px
    }
`

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 30px;
`

const Form = styled.form`
display: flex;
height: auto;
flex-direction: column; 
background-color: #00021A;
padding: 40px 20px 20px 20px;
align-items: center;
position: relative;
justify-content: center;
box-sizing: border-box;
border-radius: 20px;

@media screen and (max-width: 1199px) {
    max-width: 100%;
    padding: 40px 20px;
}
`

const Input = styled.input` 
    width: 360px;
    padding: 14px;
    border: none;
   
    box-sizing: border-box;
    
    font-family: inherit;
    font-size: 20px;
    
    color: white;
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

    &:focus {
        border-radius: 10px;
    }

    &:invalid {
        border-radius: 10px;
        border: 1px solid #EF5959;
        outline: #EF5959
    }

    &:invalid{
        &:focus + p{
         {
            opacity: 1;
        }
    }
    
`

const Button = styled.button`
    display: block;
    border: none;
    color: white;
        font-family: 'Nunito', sans-serif;
        width: fit-content;
        box-sizing: border-box;
        padding: 5px 20px;
        background-color: #080D2B;
        font-size: 20px;
        position: relative;
        background-color: orange;
        box-shadow: red 2px 3px;
        transition: 100ms all linear;
        position: relative;

        &:hover {
            box-shadow: red 4px 5px;
            transform: scale(1.05);
            background-color: white;
            color: orange
        }

       

        &::before {
            content: '';
            position: absolute;
            height: 20px;
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
            position: absolute;
            height: 20px;
            background-color: transparent;
            border-bottom: 2px solid orange;
            border-left: 2px solid orange;
            bottom: 0px;
            left: 0px;
            width: 20px;
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

const Title = styled.h2`
    font-size: 34px;
    margin-bottom: 30px;
    font-family: inherit;
    font-weight: 700;
    color: white;
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
