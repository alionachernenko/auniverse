import { Field } from "formik"
import styled from "styled-components"
import { useState } from "react"
import { ShowPasswordButton } from "components"

export const FormInput = ({ type }) => {
    const [showPassword, setShowPassword] = useState(false)
    
    return (
        <div style={{ position: 'relative' }}>
            <Field name={type}>
                {({ field, form }) => {
                    const {errors, values, touched} = form
                    return (
                        <>
                            <Input {...field}
                                type={!showPassword && type === 'password' ? 'password' : 'text'}
                                placeholder={type}
                                className={errors[type] && values[type].length && 'invalid'}
                                onFocus={() => form.setFieldTouched(type, true)} onBlur={() => form.setFieldTouched(type, false)}
                            />
                            {type === 'password' && <ShowPasswordButton showPassword={showPassword} onClick={() => setShowPassword(prev => !prev)} />}
                            {touched[type] && errors[type] && <ValidationMessage>{errors[type]}</ValidationMessage>}
                        </>)
                }}
            </Field>
        </div>)
}

const ValidationMessage = styled.p`
    color: white;
    position: absolute;
    bottom: 100%;
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

    &.invalid {
        border-radius: 10px;
        border: 1px solid #EF5959;
        outline: #EF5959
    }
`