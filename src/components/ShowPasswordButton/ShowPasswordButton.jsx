import styled from "styled-components"
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'

export const ShowPasswordButton = ({showPassword, onClick}) => {
    return (
        <Button type='button' onClick={onClick}>
            {showPassword ? <AiOutlineEyeInvisible fill='#00021A' size='80%' /> :
                <AiOutlineEye fill='#00021A' size='80%' />}
        </Button>
    )
}

const Button = styled.button`
    position: absolute;
    right: 10px;
    top: calc(57px/2);
    transform: translateY(-50%);
    background-color: white;
    border: none;
    border-radius: 15px;
    padding: 0;
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
`