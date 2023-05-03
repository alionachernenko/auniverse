import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { authContext } from 'context';
import { changeUsername } from 'utils';
import { Oval } from 'react-loader-spinner';
import { RxUpload } from 'react-icons/rx';
import { BsPencilSquare } from 'react-icons/bs';
import { memo } from 'react';
import { MdDone, MdClose } from 'react-icons/md';

import styled from 'styled-components';
import { UploadAvatarWindow } from 'components/UploadAvatarWindow/UploadAvatarWindow';

export const ProfileCard = memo(
  ({ avatar, username, setPhotoPath, setUsername }) => {
    const { userId } = useContext(authContext);
    const [showUploadAvatarWindow, setShowUploadAvatarWindow] = useState(false);
    const [isAvatarLoading, setIsAvatarLoading] = useState(false);
    const [usernameFormValue, setUsernameFormValue] = useState('');
    const [showUsernameFormWarning, setShowUsernameFormWarning] =
      useState(false);

    const location = useLocation();

    const [showChangeUsernameForm, setShowChangeUsernameForm] = useState(false);

    const onUsernameFormSubmit = e => {
      e.preventDefault();

      const username = e.target.elements.username.value.trim();

      changeUsername(userId, username);
      setUsername(username);
      setShowChangeUsernameForm(false);
    };

    return (
      <Info>
        <AvatarWrapper>
          {location.pathname.includes('profile') && (
            <>
              <UploadButton onClick={() => setShowUploadAvatarWindow(true)}>
                <RxUpload
                  size="100%"
                  fill="orange"
                  color="orange"
                  stroke="orange"
                />
              </UploadButton>
              {showUploadAvatarWindow && (
                <UploadAvatarWindow
                  onClose={() => setShowUploadAvatarWindow(false)}
                  setPhotoPath={setPhotoPath}
                  setIsAvatarLoading={setIsAvatarLoading}
                />
              )}
            </>
          )}

          {isAvatarLoading ? (
            <Spinner>
              <Oval
                color="#FF6600"
                secondaryColor="orange"
                width={'100%'}
                height={'100%'}
              />
            </Spinner>
          ) : (
            <Avatar src={`${avatar}`} alt={`${username}'s avatar`} />
          )}
        </AvatarWrapper>
        <UsernameWrapper>
          <Username>{username}</Username>
          {location.pathname.includes('profile') && (
            <ChangeUsernameButton
              onClick={() => {
                setShowChangeUsernameForm(true);
              }}
            >
              <BsPencilSquare color="white" size={20} />
            </ChangeUsernameButton>
          )}
        </UsernameWrapper>
        {showChangeUsernameForm && (
          <ChangeUsernameFormWrapper>
            <ChangeUsernameForm onSubmit={e => onUsernameFormSubmit(e)}>
              <div>
                <input
                  type="text"
                  name="username"
                  minLength="3"
                  required
                  autoComplete="off"
                  value={usernameFormValue}
                  onChange={e => {
                    const { value } = e.target;
                    setShowUsernameFormWarning(value.length > 10);
                    setUsernameFormValue(value);
                  }}
                />
                {showUsernameFormWarning && <p>Limit: 10 characters</p>}
              </div>
              <button type="submit">
                <MdDone size={15} />
              </button>
            </ChangeUsernameForm>
            <CloseChangeUsernameFormButton
              type="button"
              onClick={() => setShowChangeUsernameForm(false)}
            >
              <MdClose size={15} />
            </CloseChangeUsernameFormButton>
          </ChangeUsernameFormWrapper>
        )}
      </Info>
    );
  }
);

const ChangeUsernameFormWrapper = styled.div`
  display: flex;
  gap: 5px;
  & div {
    position: relative;

    & p {
      position: absolute;
      bottom: -25px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%
    }
  }
`;

const CloseChangeUsernameFormButton = styled.button`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  border: 1px solid red;

  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled.div`
  margin-bottom: 20px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 10px;

  @media screen and (min-width: 1200px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const Username = styled.h1`
  text-align: center;
`;
const Spinner = styled.div`
  width: 90%;
  height: 90%;
  text-align: center;
`;
const AvatarWrapper = styled.div`
  height: 200px;
  width: 200px;
  border-radius: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  overflow: hidden;

  background-color: transparent;

  &:hover button {
    opacity: 1;
  }
`;
const UsernameWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: baseline;
  justify-content: center;
  flex-wrap: wrap;
`;

const Avatar = styled.img`
  width: 200px;
  height: 100%;
  object-fit: cover;
`;

const UploadButton = styled.label`
  width: 30px;
  height: 30px;
  padding: 5px;
  border: none;
  border-radius: 100px;

  position: absolute;
  z-index: 1111;
  opacity: 0;

  background-color: white;
  cursor: pointer;
  transition: 250ms all ease;

  ${AvatarWrapper}:hover & {
    opacity: 1;
  }
`;

const ChangeUsernameButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  height: 100%;
`;

const ChangeUsernameForm = styled.form`
  height: 30px;
  display: flex;

  & input {
    height: 100%;
    padding: 0 15px;
    width: 200px;
    border-radius: 15px;
    background-color: white;
    border: 1px solid orange;
    margin-right: 5px;
    font-size: 17px;
    font-family: 'Nunito', sans-sefif;
    color: #00021a
  }

  & button {
    height: 100%;
    width: 30px;
    border-radius: 15px;
    border: 1px solid green;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
