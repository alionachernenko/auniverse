import styled from "styled-components"

export const Modal = ({ image }) => {
    return (
        <ModalWindow>
            <img src={image} alt="" />
        </ModalWindow>
    )
} 

const ModalWindow = styled.div`
    position: absolute;
    z-index: 111111111111
`