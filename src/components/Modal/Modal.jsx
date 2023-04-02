import styled from "styled-components"
import { MdClose } from "react-icons/md"


export const Modal = ({image, onClick}) => {
    return(
        <ModalWindow>
            <CloseButton type="button" onClick={onClick}>
                    <MdClose color='orange' size='100%' />
            </CloseButton>
            <Image src={image} alt="" />
        </ModalWindow>
    )
} 

const ModalWindow = styled.div`
    position: absolute;
    z-index: 111111111111;
    top: 50%;
    left: 50%;
    // width: 89vw;
    // height: auto;
    // max-height: 80vh;
    transform: translate(-50%, -50%)
`

const Image = styled.img`
    width: auto;
    max-height: 80vh;
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
`