import { Field } from 'formik';
import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import { ShowPasswordButton } from 'components';

export const FormInput = ({ type }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <Field name={type}>
        {({ field, form }) => {
          const { errors, values, touched } = form;
          return (
            <>
              <Input
                {...field}
                type={
                  !showPassword && type === 'password' ? 'password' : 'text'
                }
                placeholder={`${type} *`}
                className={errors[type] && values[type].length && 'invalid'}
                onFocus={() => form.setFieldTouched(type, true)}
                onBlur={() => form.setFieldTouched(type, false)}
                autoComplete={type === 'password' ? 'new-password' : 'off'}
                required
              />
              {type === 'password' && (
                <ShowPasswordButton
                  showPassword={showPassword}
                  onClick={() => setShowPassword(prev => !prev)}
                />
              )}
              {touched[type] && errors[type] && values[type].length !== 0 && (
                <ValidationMessage>{errors[type]}</ValidationMessage>
              )}
            </>
          );
        }}
      </Field>
    </div>
  );
};

const showMessage = keyframes`
    0% {
        opacity: 0
    }

    100% {
        opacity: 1
    }
`;

const ValidationMessage = styled.p`
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
  background-color: #ef5959;
  animation: ${showMessage} 200ms ease;

  @media screen and (min-width: 1200px) {
    font-size: 15px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: none;

  box-sizing: border-box;

  font-family: inherit;
  font-size: 20px;

  color: white;
  background: transparent;
  border-bottom: 1px solid white;
  -webkit-box-shadow: inset 0 0 0 50px #00021a;
  -webkit-text-fill-color: #ffffff;

  &::placeholder {
    font-size: 20px;
  }

  @media screen and (max-width: 1199px) {
    width: 100%;
  }

  &:focus {
    border-radius: 10px;
  }

  &.invalid {
    border-radius: 10px;
    border: 1px solid #ef5959;
  }

  &:focus,
  &.invalid {
    ouline: #ef5959;
  }
`;
