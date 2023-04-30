import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchUserInfo } from 'utils';
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png';
import styled from 'styled-components';
import { authContext } from 'context';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestore } from 'config/firebase';

export const ChatItem = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recepientUsername, setRecepientUsername] = useState();
  const [recepientPhoto, setRecepientPhoto] = useState();
  const [recepientId, setRecepientId] = useState();
  const [isTyping, setIsTyping] = useState(false);
  const { userId } = useContext(authContext);
  const chatId = searchParams.get('id');

  useEffect(() => {
    fetchUserInfo(data.members.find(id => id !== userId))
      .then(res => {
        const { username, photoUrl, id } = res.val();

        setRecepientUsername(username);
        setRecepientPhoto(photoUrl ?? avatarPlaceholder);
        setRecepientId(id);
      })
      .catch(error => console.log(error));
  }, [data.members, data.recepientId, userId]);

  useEffect(() => {
    if (chatId) {
      const docRef = doc(firestore, 'chats', chatId);
      onSnapshot(docRef, snapshot => {
        if (snapshot.data().typing && snapshot.data().typing !== userId) {
          setIsTyping(snapshot.data().typing);
        } else setIsTyping(false);
      });
    }
  }, [chatId, userId]);

  return (
    <Item
      onClick={() => setSearchParams({ id: data.id, with: recepientId })}
      className={chatId === data.id && 'selected'}
    >
      <AvatarWrapper>
        <img
          src={recepientPhoto}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt='avatar'
        />
      </AvatarWrapper>
      <Data>
        <p style={{ fontWeight: 700 }}>{recepientUsername}</p>
        <p
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {data.messages[data.messages.length - 1].text}
        </p>
        {isTyping === recepientId && <p>...</p>}
      </Data>
    </Item>
  );
};

const Item = styled.li`
  background-color: white;
  border-radius: 15px;
  border: 1px solid white;
  height: 70px;
  display: flex;
  padding: 10px;
  align-items: center;
  box-sizing: border-box;
  gap: 10px;
  font-family: 'Nunito', sans-serif;

  &.selected {
    background-color: #00021a;
    color: white;
  }
`;

const AvatarWrapper = styled.div`
  min-width: 50px;
  width: 50px;
  min-height: 50px;
  height: 50px;
  border-radius: 30px;
  overflow: hidden;
`;

const Data = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: nowrap;
  overflow: hidden;
`;
