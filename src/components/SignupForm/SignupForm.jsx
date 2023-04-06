import { useContext } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { Oval } from 'react-loader-spinner'
import { authContext } from 'context'
import styled from 'styled-components'
import { Formik, Form} from 'formik'
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
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/, 'Password must be at least 8 characters, no more than 32 characters, and contain at least one upper case letter, one lower case letter, and one numeric digit')
        .required('Password is required field'),
    username: yup
        .string()
        .trim()
        .min(4, 'Username must contain minimum 4 characters')
        .max(12, 'Username may contain maximum 12 characters')
        .required('Username is required field')
})

const initialValues = {
    email: '',
    password: '',
    username: ''
}

export const SignupForm = () => {
    const { handleSignUp, isLoading } = useContext(authContext)

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                const { email, password, username } = values
                handleSignUp(email, password, username)
            }}
            validationSchema={schema}
        >
        <FormWrapper autoComplete='off'>
            <Icon className='icon-wrapper'>
                {isLoading ? <Oval color='#FF6600' secondaryColor='orange' width={40} height={40} strokeWidth={4} /> : 
                <FaUserEdit className='icon' fill='orange' size='30px'/> } 
            </Icon>
            <Title>Sign up</Title>
                <Inputs>
                    <input style={{ display: 'none' }} />
                    <input type="password" style={{ display: 'none' }}/>
                <FormInput type='email' />
                <FormInput type='password'/>
                <FormInput type='username'/>
            </Inputs>       
            <Button type="submit">Sign Up</Button>
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
display: flex;
padding: 40px;
height: auto;
flex-direction: column; 
background-color: #00021A;
align-items: center;
position: relative;
justify-content: center;
box-sizing: border-box;
border-radius: 20px;

@media screen and (max-width: 767px) {
    width: 500px
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
