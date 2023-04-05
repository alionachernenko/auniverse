import styled from "styled-components"
import { MdClose } from "react-icons/md"

export const Modal = ({image, onClick}) => {
    return(
        <ModalWindow>
            <Image src={image} alt="" />
            <CloseButton type="button" onClick={onClick}>
                    <MdClose color='orange' size='100%' />
            </CloseButton>
        </ModalWindow>
    )
} 

const ModalWindow = styled.div`
    position: relative;
    width: 95%;
    max-width: 800px;
    height: auto;
    max-height: 95vh;
    overflow-y: overlay;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const CloseButton = styled.button`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    position: absolute;
    top: 10px;
    right: 12px;
    background-color: white;
    border: orange;
    transition: 150ms all ease;
`

