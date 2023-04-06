import { authContext } from 'context' 

import { useContext } from 'react'
import { IoMdLogIn } from 'react-icons/io'
import { Oval } from 'react-loader-spinner'

import styled from 'styled-components'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { FormInput } from 'components/FormInput/FormInput'

const schema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please, provide a valid email (ex: john@company.com)')
        .required('Email is a required field'),
    password: yup
        .string()
        .trim()
        .required('Password is required field')
})

const initialValues = {
    email: '',
    password: '',
}

export const LoginForm = () => {
    const { handleLogInSubmit, isLoading } = useContext(authContext)
    
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                const {email, password} = values
                handleLogInSubmit(email, password)
            }}
            validationSchema={schema}
        >
            <FormWrapper autoComplete='off'>
                <Icon>
                    {isLoading ? <Oval color='#FF6600' secondaryColor='orange' width={40} height={40}/> : 
                    <IoMdLogIn fill='orange' size='30px'/> } 
                </Icon>
                
                <Title>Log in</Title>
                <Inputs>
                    <input style={{ display: 'none'}} />
                    <input type="password" style={{ display: 'none' }}/>
                    <FormInput type='email' />
                    <FormInput type='password'/>
                </Inputs>
                <Button type="submit">Log In</Button>
                </FormWrapper>
        </Formik>
    ) 
}

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 30px;
    width: 100%
`


const FormWrapper = styled(Form)`
    height: auto;
    padding: 40px;
    box-sizing: border-box;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;

    background-color: #00021A;
    width: 90vw;
    max-width: 500px;

    @media screen and (min-width: 768px) and (max-width: 1200px) {
        padding: 40px 20px
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

