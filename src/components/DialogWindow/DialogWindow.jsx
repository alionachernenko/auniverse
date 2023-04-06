import styled, { keyframes } from "styled-components"
import { MdClose } from "react-icons/md"

export const FeedbackDialogWindow = ({files, text, setShowForm, showDialogWindow }) => {

    const onDiscard = () => {

        if (JSON.parse(localStorage.getItem('text'))) {
        localStorage.removeItem('text')
        
        }
        
        if (JSON.parse(localStorage.getItem('files'))) {
        localStorage.removeItem('files')
      }

        showDialogWindow(false)
        setShowForm(false)
    }

    const onSave = () => {
        localStorage.setItem("files", JSON.stringify(files))
        localStorage.setItem("text", JSON.stringify(text))
        showDialogWindow(false)
        setShowForm(false)
    }

    return (
        <Window>
            <CloseButton type="button" onClick={() => {
                    showDialogWindow(false)
                }}>
                    <MdClose color='orange' size='100%' />
                </CloseButton>
            <Message>Are you sure you want to discard this feedback?</Message>
            <Subtitle>You can save and change it later</Subtitle>
            <div>
                <Button onClick={onDiscard} className="discard">Discard</Button>
                <Button onClick={onSave} className="save">Save</Button>
            </div>
            </Window>
    )
}

const showWindow = keyframes`
    0% {
        scale: 0;
    }
    100% {
        scale: 1
    }
`

const CloseButton = styled.button`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    transition: 150ms all ease;

    position: absolute;
    top: 2px;
    right: 2px;

    background-color: transparent;
    border: none;

    &:hover{
        transform: scale(1.2)
    }
`

const Window = styled.div`
    width: 50vw;
    display: flex;
    flex-direction: column;
    height: auto;
    background-color: white;
    position: absolute;
    animation: ${showWindow} 150ms ease;
    transform-origin: 0 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    text-align: center;
    font-family: 'Nunito', sans-serif;
    background-color: #00021A;
    font-size: 20px;
    width: 85%;
    max-width: 450px;
    color: white;
    padding: 25px;
    box-sizing: border-box;
    border-radius: 15px;
    
    z-index: 1111111111111
`

const Button = styled.button`
    border-radius: 10px;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    padding: 5px 10px;
    transition: 250ms all ease;

    &:first-child{
        margin-right: 10px
    }

    &.discard{
        border: 2px solid white;
        background-color: transparent;
        color: white;

        &:hover{
            transform: scale(1.1)
        }
    }

    &.save{
        border: 2px solid orange;
        background-color: white;
        color: #00021A;

        &:hover{
            transform: scale(1.1)
        }
    }
`

const Message = styled.p`
    margin-bottom: 5px;
    
`

const Subtitle = styled.p`
    font-size: 15px;
    margin-bottom: 15px;
`