import { useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchUserInfo } from 'utils';
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png';
import styled from 'styled-components';
import { authContext } from 'context';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestore } from 'config/firebase';
import { TypingDots } from 'components/TypingDots/TypingDots';

export const ChatItem = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recepientUsername, setRecepientUsername] = useState();
  const [recepientPhoto, setRecepientPhoto] = useState();
  const [recepientId, setRecepientId] = useState();
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useContext(authContext);
  const chatId = searchParams.get('id');

  const memberId = useMemo(
    () => data.members.find(id => id !== userId),
    [data.members, userId]
  );

  useEffect(() => {
    setIsLoading(true);
    fetchUserInfo(memberId)
      .then(res => {
        const { username, photoUrl, id } = res.val();

        setRecepientUsername(username);
        setRecepientPhoto(photoUrl ?? avatarPlaceholder);
        setRecepientId(id);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }, [memberId, userId]);

  useEffect(() => {
    if (chatId) {
      const docRef = doc(firestore, 'chats', chatId);
      onSnapshot(docRef, snapshot => {
        if (snapshot.data()?.typing && snapshot.data()?.typing !== userId) {
          setIsTyping(snapshot.data().typing);
        } else setIsTyping(false);
      });
    }
  }, [chatId, userId]);

  return (
    <Item
      onClick={() => setSearchParams({ id: data.id, with: recepientId })}
      className={chatId === data.id && 'selected'}
      key={data.id}
    >
      <AvatarWrapper>
        {!isLoading && (
          <img
            src={recepientPhoto}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt="avatar"
          />
        )}
      </AvatarWrapper>
      <Data>
        {!isLoading ? (
          <p style={{ fontWeight: 700 }}>{recepientUsername}</p>
        ) : (
          <div></div>
        )}
        {!isLoading ? (
          <p
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {data.messages[data.messages.length - 1].text}
          </p>
        ) : (
          <div></div>
        )}
      </Data>
      {isTyping === recepientId && (
        <TypingDots size={5} color="white" className="small" />
      )}
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
  width: 230px;
  position: relative;

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
  background-color: #ced4da;
`;

const Data = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;

  & div {
    height: 12px;
    border-radius: 5px;
    width: 100%;
    background-color: #ced4da;
  }
`;
