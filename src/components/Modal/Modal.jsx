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
    position: absolute;
    z-index: 111111111111;
    top: 50%;
    left: 50%;
    width: 95%;
    max-width: 800px;
    height: auto;
    max-height: 95vh;
    transform: translate(-50%, -50%);
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
    top: 2px;
    right: 2px;
    background-color: white;
    border: orange;
    transition: 150ms all ease;
`

