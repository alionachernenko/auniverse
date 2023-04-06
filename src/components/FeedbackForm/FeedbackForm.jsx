import {useContext, useState } from "react"
import { leaveFeedbackPhotos, leaveFeedbackMessage } from "utils"

import styled from 'styled-components'
import { SlPicture } from 'react-icons/sl'
import { authContext } from "context"
import { nanoid } from "nanoid"
import { MdClose } from "react-icons/md"
import { Modal } from "components/Modal/Modal"
import { FeedbackDialogWindow } from "components/DialogWindow/DialogWindow"
import { Backdrop } from "components/Backdrop/Backdrop"

export const FeedbackForm = ({setIsFormOpen}) => {
    const {userId} = useContext(authContext)

    
    const [files, setFiles] = useState()
    const [showForm, setShowForm] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [activeImage, setActiveImage] = useState()
    const [showDialogWindow, setShowDialogWindow] = useState(false)
    const [text, setText] = useState(() => {
        if (JSON.parse(localStorage.getItem('text'))) {
        return JSON.parse(localStorage.getItem('text'));
      }
      else return ''
    })
    const [images, setImages] = useState(() => {
        if (JSON.parse(localStorage.getItem('files'))) {
        return JSON.parse(localStorage.getItem('files'));
      }
      else return []
    })
 
    const onFormSubmit = (e) => {
        e.preventDefault()

        const text = e.target.elements.feedback.value
        const photos = files
                    
        const feedbackId = nanoid()

        leaveFeedbackMessage(text, userId, feedbackId)

        Object.values(photos).forEach(file => {
            leaveFeedbackPhotos(file, userId, feedbackId)
        })

        setShowForm(false)
    }
    
    const onChooseFile = (e) => {
        const files = Object.values(e.target.files)
        let filesChoosen = []

        

        files.forEach(file => {
            const reader = new FileReader()
            reader.readAsDataURL(file)

            reader.onload = () => {
            filesChoosen = [...filesChoosen, reader.result]
                
                setImages(filesChoosen)
            };
        })

        setFiles([...e.target.files])
    }

    const onRemoveFile = (index) => {
        setImages(prev => prev.filter(image => prev.indexOf(image) !== index))
        setFiles(prev => prev.filter(file => prev.indexOf(file) !== index))
    }

    return (
        <>
            <Backdrop onClick={() => {
                    if (text !== '' || images.length !== 0) setShowDialogWindow(true)
                    else setIsFormOpen(false)
                }}>
            <FormBox>
                <CloseButton type="button" onClick={() => {
                    if (text !== '' || images.length !== 0) setShowDialogWindow(true)
                    else setIsFormOpen(false)
                }}>
                    <MdClose color='orange' size='100%' />
                </CloseButton>
                <Title>Leave your feedback below</Title>
                {showForm ? <Form onSubmit={(e) => onFormSubmit(e)}>
                    <InputsWrapper>
                        <FeedbackUnputWrapper >
                            <FeedbackInput name="feedback" required value={text} onChange={(e) => setText(e.target.value)}/>
                            <UploadPhotosButton htmlFor="photos">
                            <SlPicture size='100%' fill="#00021A" />
                            </UploadPhotosButton>
                            <FilesInput accept=".png, .jpg, .jpeg, .gif" type="file" name='photos[]' id="photos" multiple onInput={(e) => { onChooseFile(e)}} />
                        </FeedbackUnputWrapper>
                    </InputsWrapper>
                    <Photos>
                        {images && images.map((image, index) =>
                            <PhotoWrapper key={index}>
                                <RemovePhotoButton onClick={() => onRemoveFile(index)}>
                                    <MdClose fill="#00021A" size='100%' />
                                </RemovePhotoButton>
                                <Photo src={image} alt='Feedback attachment' onClick={() => {
                                    setShowModal(true)
                                    setActiveImage(index)
                                }} />
                            </PhotoWrapper>)}
                    </Photos>
                    <SubmitButton type="submit">Send feedback</SubmitButton>
                </Form> :
                    <>
                        <ThanksMessage>Thank you!</ThanksMessage>
                        <ThanksMessage>We will take your notes into account and fix the problems</ThanksMessage></>
                }
                </FormBox>
            {showModal && <Modal image={images[activeImage]}
                onClick={() => setShowModal(false)} />}
                {showDialogWindow && <FeedbackDialogWindow
                setShowForm={setIsFormOpen}
                files={images}
                text={text}
                    showDialogWindow={setShowDialogWindow} />}
            </Backdrop>
            </>
    )
}

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


const FormBox = styled.div`
    background-color: white;
    overflow-y: overlay;
    max-height: 80vh;
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

const FeedbackUnputWrapper = styled.div`
    overflow: hidden;
    border-radius: 15px;
     resize: vertical;
     min-height: 120px;
    border: 1px solid #00021A;
    width: 100%;
    padding-bottom: 33px
`

const FeedbackInput = styled.textarea`
    min-height: 150px;
    resize: none;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
    padding: 10px 10px 0 10px;

    border: none;
    font-family: 'Nunito', sans-serif;
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
    display: block;
    width: 25px;
    height: 25px;
    position: absolute;
    bottom: 7px;
    left: 7px;
    cursor: pointer
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
    cursor: pointer;

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