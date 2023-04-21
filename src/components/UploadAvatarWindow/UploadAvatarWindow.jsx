import { Backdrop } from 'components';
import { authContext } from 'context';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

import { addAvatar } from 'utils';

export const UploadAvatarWindow = ({
  setPhotoPath,
  setIsAvatarLoading,
  onClose,
}) => {
  const { userId } = useContext(authContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadingError, setUploadingError] = useState(null);

  const onFormSubmit = e => {
    e.preventDefault();

    setIsAvatarLoading(true);
    addAvatar(file, userId, setPhotoPath, setIsAvatarLoading);
    onClose()
  };

  const makeAvatarPreview = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  const uploadAvatar = file => {
    const availableTypes = [
      'image/png',
      'image/jpg',
      'image/gif',
      'image/jpeg',
    ];

    if (file) {
        if (!availableTypes.includes(file.type)) {
        setUploadingError(
          `Available formats: .pngm .jpg, .gif, .jpeg. Your format: .${file.type.slice(
            6
          )}`
        );
        return;
      }
      if (file.size > 4194304) {
        setUploadingError(
          `Maximum size: 4MB. Your size: ${Math.ceil(file.size / 1048576)}MB `
        );
        return;
      }
      else {
        setUploadingError(null)
      }
      

      makeAvatarPreview(file);
      setFile(file);
    }
  };

  return (
    <Backdrop onClick={onClose}>
      <Window>
        <CloseButton type="button" onClick={onClose}>
          <MdClose color="orange" size="100%" />
        </CloseButton>
        <Title>Choose a photo</Title>
        {uploadingError && <ErrorMessage>{uploadingError}</ErrorMessage>}
        <InnerWrapper>
          <div>
            <Rules>
              <li>
                <span>Maximum size:</span> 4MB
              </li>
              <li>
                <span>Available formats:</span> .png, .jpg, .jpeg, .gif
              </li>
            </Rules>
          </div>
          <div>
            <form action="" onSubmit={e => onFormSubmit(e)} id="uploadForm">
              <UploadInput
                id="upload_file"
                accept=".png, .jpg, .jpeg, .gif"
                type="file"
                name="photo"
                onChange={e => uploadAvatar(e.target.files[0])}
              />
              <UploadButton htmlFor="upload_file">
                Upload from device
              </UploadButton>
            </form>
            <DragAndDropField
              onDrop={e => {
                e.preventDefault();
                console.log(e);
                uploadAvatar(e.dataTransfer.files[0]);
              }}
            >
              <p>Drag and Drop it here</p>
            </DragAndDropField>
          </div>
        </InnerWrapper>
        {preview && (
          <PreviewImageWrapper>
            <PreviewImage src={preview} alt="avatar preview" />
          </PreviewImageWrapper>
        )}
        <SubmitButton
          disabled={!file || uploadingError}
          type="submit"
          form="uploadForm"
        >
          Upload
        </SubmitButton>
      </Window>
    </Backdrop>
  );
};

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

const ErrorMessage = styled.p`
  color: red;
`;

const InnerWrapper = styled.div`
  width: 100%;
  display: flex;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    gap: 20px;
  }

  @media screen and (min-width: 768px) {
    justify-content: space-between;
    gap: 20px;
  }
`;

const Rules = styled.ul`
  & li {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  & span {
    display: inline;
    font-weight: 600;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #00021a;
  font-family: 'Nunito', sans-serif;
`;

const UploadInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  position: absolute;
  z-index: -1;
  opacity: 0;
  overflow: hidden;
`;

const UploadButton = styled.label`
  font-weight: 500;
  cursor: pointer;
  width: fit-content;
  display: block;
  border-radius: 15px;
  border: 1px solid #00021a;
  background-color: white;
  color: #00021a;
  padding: 10px 15px;
  margin: 0 auto;
`;
const DragAndDropField = styled.div` 

@media screen and (max-width: 767px) {
    display: none;
  };

  min-width: 250px;
  min-height: 250px;
  border: 2px dashed orange;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #80808021;
  border-radius: 20px;

 
`;
const Window = styled.div`
  border-radius: 20px;
  position: absolute;
  width: 95%;
  max-width: 600px;
  height: auto;
  max-height: 95vh;
  overflow-y: overlay;
  overflow-x: hidden;
  background-color: white;
  padding: 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  & p {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 500;
  }
`;
const PreviewImage = styled.img`
  width: auto;
  max-width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PreviewImageWrapper = styled.div`
  height: 200px;
  min-height: 200px;
  width: fit-content;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  border: none;
  padding: 10px 20px;
  font-family: 'Nunito', sans-serif;
  font-size: 20px;
  color: white;
  background-color: #00021a;
  border-radius: 20px;

  &:disabled {
    background-color: grey
  }
`;
