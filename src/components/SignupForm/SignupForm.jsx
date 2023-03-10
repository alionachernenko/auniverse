import { useContext } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { Oval } from 'react-loader-spinner'
import authContext from '../../context/context'
import styled from 'styled-components'

export const SignupForm = () => {
    const { handleSignUp, isLoading} = useContext(authContext)
    

    return (
        <Form onSubmit={(e) => {
            const {email, password, username} = e.target.elements
            handleSignUp(e, email.value, password.value, username.value)
        }
        }>
            <Icon className='icon-wrapper'>
                {isLoading ? <Oval color='#FF6600' secondaryColor='orange' width={40} height={40} strokeWidth={4} /> : 
                <FaUserEdit className='icon' fill='orange' size='30px'/> } 
            </Icon>
            <Title>Sign up</Title>
            <Input type="text" name="username" placeholder="username" />
            <Input type="email" name="email" id="" placeholder="email"/>
            <Input type="password" name="password" placeholder="password" />
               
            <Button type="submit">Sign Up</Button>
        </Form>
    )
}

const Form = styled.form`
    display: flex;
    height: 100%;
    flex-direction: column; 
    background-color: #070D34;
    padding: 35px 20px 20px 20px;
    align-items: center;
    position: relative;
    justify-content: center;
    box-sizing: border-box;
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
    -webkit-box-shadow: inset 0 0 0 50px #070D34;
    -webkit-text-fill-color: #ffffff;
    
    &::placeholder{
        font-size: 20px;
    }
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