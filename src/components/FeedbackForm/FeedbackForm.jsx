import { useContext, useEffect, useState } from "react"
import { leaveFeedbackPhotos, leaveFeedbackText } from "utils/firebase"

import styled, {keyframes} from 'styled-components'
import { createPortal } from "react-dom"
import {SlPicture} from 'react-icons/sl'
import { authContext } from "context/context"
import { nanoid } from "nanoid"
import { MdClose } from "react-icons/md"

export const FeedbackForm = ({onClick}) => {
    const {userId} = useContext(authContext)

    const [images, setImage] = useState([])
    const [files, setFiles] = useState([])
    const [showForm, setShowForm] = useState(true)

    useEffect(() => {
        const onEscapePress = (e) => {
            if(e.code === 'Escape') onClick()
        }
            window.addEventListener('keydown', onEscapePress)

            return () => {
                window.removeEventListener('keydown', onEscapePress)
            }
    }, [onClick])

    const onFormSubmit = (e) => {
        e.preventDefault()

        const text = e.target.elements.feedback.value
        const photos = files
                    
        const feedbackId = nanoid()

        leaveFeedbackText(text, userId, feedbackId)

        Object.values(photos).forEach(file => {
            leaveFeedbackPhotos(file, userId, feedbackId)
        })

        setShowForm(false)
    }
    
    const onChooseFile = (e) => {
        const files = Object.values(e.target.files)
        console.log(files)
        let filesChoosen = []

        files.forEach(file => {
            const reader = new FileReader()
            reader.readAsDataURL(file)

            reader.onload = () => {
            console.log(reader.result);
            filesChoosen = [...filesChoosen, reader.result]
                
            setImage(filesChoosen)
            };
        })

        setFiles([...e.target.files])
    }

    const onRemoveFile = (index) => {
        setImage(prev => prev.filter(image => prev.indexOf(image) !== index))
        setFiles(prev => prev.filter(file => prev.indexOf(file) !== index))
    }

    return createPortal(
        <Backdrop onClick={(e) => {
            if(e.target === e.currentTarget)onClick()
        }}>
            <FormBox>
                <CloseButton type="button" onClick={onClick}>
                    <MdClose color='orange' size='100%' />
                </CloseButton>
                <Title>Leave your feedback below</Title>
                {showForm ? <Form onSubmit={(e) => onFormSubmit(e)}>
                    <InputsWrapper>
                        <FeedbackInput name="feedback" required />
                        <UploadPhotosButton htmlFor="photos">
                            <SlPicture size='100%' fill="#00021A" />
                        </UploadPhotosButton>
                        <FilesInput type="file" name='photos[]' id="photos" multiple onInput={(e) => { onChooseFile(e)}} />
                    </InputsWrapper>
                    <Photos>
                        {images && images.map((image, index) =>
                            <PhotoWrapper key={index}>
                                <RemovePhotoButton onClick={() => onRemoveFile(index)}>
                                    <MdClose fill="#00021A" size='100%' />
                                </RemovePhotoButton>
                                <Photo src={image} alt='Feedback attachment' />
                            </PhotoWrapper>)}
                    </Photos>
                    <SubmitButton type="submit">Send feedback</SubmitButton>
                </Form> :
                    <>
                        <ThanksMessage>Thank you!</ThanksMessage>
                        <ThanksMessage>We will take your concerns into account and fix the problems</ThanksMessage></>
                }
            </FormBox>
        </Backdrop>, document.querySelector('#feedback-form-root')
    )
}

const backdropShow = keyframes`
    0% {
        opacity: 0
    }

    100% {
        opacity: 1
    }
`


const ThanksMessage = styled.p`
    text-align: center;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    color: #00021A;
`


const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    color: #00021A;
    font-size: 20px;

    @media screen and (min-width: 420px) {
        font-size: 25px
    }

    @media screen and (min-width: 768px) {
        font-size: 35px
    }
`

const Backdrop = styled.div`
    width: 100vw;
    height: 100vh; 
    padding: 20px;
    overflow-y: scroll;


    box-sizing: border-box;

    position: fixed;
    z-index: 11111;
    background-color: rgba(0, 0, 0, 0.5);
    
    animation: ${backdropShow} 200ms ease;
`

const FormBox = styled.div`
    position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    background-color: white;
    overflow: hidden;
    height: auto;
    padding: 20px;
    position: relative;
    border-radius: 20px;

    @media screen and (min-width: 768px) {
        width: 500px;
         position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;

`

const InputsWrapper = styled.div`
    position: relative;
    width: 100%
`

const FeedbackInput = styled.textarea`
    min-height: 150px !important;
    resize: vertical;
    width: 100%;
    box-sizing: border-box;

    border-radius: 15px;
    padding: 10px;
    font-family: 'Nunito', sans-serif;
    border: 1px solid #00021A;
    font-size: 17px
`

const FilesInput = styled.input`
    width: 0.1px;
    height: 0.1px;
    position: absolute;
    z-index: -1;
    opacity: 0;
    overflow: hidden;
`

const UploadPhotosButton = styled.label`
    width: 25px;
    position: absolute;
    bottom: 7px;
    left: 7px;
`

const Photos = styled.ul`
    display: flex;
    height: auto;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px
`

const PhotoWrapper = styled.li`
    height: 90px;
    width: auto;
    border-radius: 10px;
    overflow: hidden;
    position: relative
`

const RemovePhotoButton = styled.span`
    position: absolute;
    top: 2px;
    right: 2px;
    height: 20px;
    width: 20px;
    background-color: white;
    border-radius: 10px;
    opacity: 0;
    transition: 200ms all ease;

    ${PhotoWrapper}:hover &{
        opacity: 1;
    }
`

const Photo = styled.img`
    width: 100%;
    height: 100%
`

const SubmitButton = styled.button`
    border: none;
    padding: 10px;
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    border-radius: 20px;
    background-color: #00021A;
    color: white;
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