import { useContext, useState } from 'react';
import { leaveFeedbackPhotos, leaveFeedbackMessage } from 'utils';

import styled from 'styled-components';
import { SlPicture } from 'react-icons/sl';
import { authContext } from 'context';
import { nanoid } from 'nanoid';
import { MdClose } from 'react-icons/md';
import { Modal, FeedbackDialogWindow, Backdrop } from 'components';

export const FeedbackForm = ({ setIsFormOpen }) => {
  const { userId } = useContext(authContext);

  const [showForm, setShowForm] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeImage, setActiveImage] = useState();
  const [showDialogWindow, setShowDialogWindow] = useState(false);

  const [text, setText] = useState(() => {
    const text = JSON.parse(localStorage.getItem('text'));
    return text ? text : '';
  });
  const [images, setImages] = useState(() => {
    const files = JSON.parse(localStorage.getItem('files'));
    return files ? files : [];
  });

  const onCloseForm = () => {
    const isFormFilled = text !== '' || images.length !== 0;
    setShowDialogWindow(isFormFilled && showForm);
    setIsFormOpen(isFormFilled && showForm);
  };

  const onFormSubmit = e => {
    e.preventDefault();

    const feedbackId = nanoid();
    console.log(images);

    leaveFeedbackMessage(text, userId, feedbackId);
    console.log(images);
    Object.values(images).forEach(file => {
      leaveFeedbackPhotos(file, userId, feedbackId);
    });

    setShowForm(false);
    console.log(images);

    localStorage.removeItem('text');
    localStorage.removeItem('files');
  };

  const onChooseFile = e => {
    const files = Object.values(e.target.files);
    let imagesChoosen = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        imagesChoosen = [...imagesChoosen, reader.result];
        setImages(prev => {
          return [...prev, reader.result];
        });
      };
    });
  };

  const onRemoveFile = index => {
    setImages(prev => prev.filter(image => prev.indexOf(image) !== index));
  };

  return (
    <>
      <Backdrop onClick={onCloseForm}>
        <FormBox>
          <CloseButton type="button" onClick={onCloseForm}>
            <MdClose color="orange" size="100%" />
          </CloseButton>
          <Title>Leave your feedback below</Title>
          {showForm ? (
            <Form onSubmit={e => onFormSubmit(e)}>
              <InputsWrapper>
                <FeedbackUnputWrapper>
                  <FeedbackInput
                    name="feedback"
                    required
                    value={text}
                    onChange={e => setText(e.target.value)}
                  />
                  <UploadPhotosButton htmlFor="photos">
                    <SlPicture size="100%" fill="#00021A" />
                  </UploadPhotosButton>
                  <FilesInput
                    accept=".png, .jpg, .jpeg, .gif"
                    type="file"
                    name="photos[]"
                    id="photos"
                    multiple
                    onInput={e => {
                      onChooseFile(e);
                    }}
                  />
                </FeedbackUnputWrapper>
              </InputsWrapper>
              <Photos>
                {images &&
                  images.map((image, index) => (
                    <PhotoWrapper key={index}>
                      <RemovePhotoButton onClick={() => onRemoveFile(index)}>
                        <MdClose fill="#00021A" size="100%" />
                      </RemovePhotoButton>
                      <Photo
                        src={image}
                        alt="Feedback attachment"
                        onClick={() => {
                          setShowModal(true);
                          setActiveImage(index);
                        }}
                      />
                    </PhotoWrapper>
                  ))}
              </Photos>
              <SubmitButton type="submit">Send feedback</SubmitButton>
            </Form>
          ) : (
            <>
              <ThanksMessage>Thank you!</ThanksMessage>
              <ThanksMessage>
                We will take your notes into account and fix the problems
              </ThanksMessage>
            </>
          )}
        </FormBox>
        {showModal && (
          <Modal
            image={images[activeImage]}
            onClick={() => setShowModal(false)}
          />
        )}
        {showDialogWindow && (
          <FeedbackDialogWindow
            setShowForm={setIsFormOpen}
            files={images}
            text={text}
            showDialogWindow={setShowDialogWindow}
          />
        )}
      </Backdrop>
    </>
  );
};

const ThanksMessage = styled.p`
  text-align: center;
  font-family: 'Nunito', sans-serif;
  font-size: 20px;
  color: #00021a;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #00021a;
  font-size: 20px;

  @media screen and (min-width: 420px) {
    font-size: 25px;
  }

  @media screen and (min-width: 768px) {
    font-size: 35px;
  }
`;

const FormBox = styled.div`
  background-color: white;
  overflow-y: overlay;
  max-height: 80vh;
  height: auto;
  padding: 20px;
  position: relative;
  border-radius: 20px;
  box-sizing: border-box;
  width: 90vw;
  max-width: 600px;

  @media screen and (min-width: 768px) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const InputsWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const FeedbackUnputWrapper = styled.div`
  overflow: hidden;
  border-radius: 15px;
  resize: vertical;
  min-height: 120px;
  border: 1px solid #00021a;
  width: 100%;
  padding-bottom: 33px;
`;

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
  font-size: 17px;
`;

const FilesInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  position: absolute;
  z-index: -1;
  opacity: 0;
  overflow: hidden;
`;

const UploadPhotosButton = styled.label`
  display: block;
  width: 25px;
  height: 25px;
  position: absolute;
  bottom: 7px;
  left: 7px;
  cursor: pointer;
`;

const Photos = styled.ul`
  display: flex;
  height: auto;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const PhotoWrapper = styled.li`
  height: 90px;
  width: auto;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
`;

const RemovePhotoButton = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  height: 20px;
  width: 20px;
  background-color: white;
  border-radius: 10px;
  opacity: 1;
  transition: 200ms all ease;
  cursor: pointer;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
`;

const SubmitButton = styled.button`
  border: none;
  padding: 10px;
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  border-radius: 20px;
  background-color: #00021a;
  color: white;
`;

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

  background-color: transparent;
  border: none;
`;
