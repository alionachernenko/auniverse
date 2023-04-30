import { Chat } from 'components/Chat';
import { ChatItem } from 'components/ChatItem/ChatItem';
import { firestore } from 'config/firebase';
import { authContext } from 'context';
import { query } from 'firebase/database';
import { collection, onSnapshot, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const MessagesPage = () => {
  const [chats, setChats] = useState([]);
  const [searchParams] = useSearchParams();
  const { userId } = useContext(authContext);
  const chatId = searchParams.get('id');
  const recepientId = searchParams.get('with');

  useEffect(() => {
    getChats(userId);
  }, [userId]);

  const getChats = userId => {
    const q = query(
      collection(firestore, 'chats'),
      where('members', 'array-contains', userId)
    );

    onSnapshot(q, querySnapshot => {
      const chats = [];
      querySnapshot.forEach(doc => {
        chats.push({ ...doc.data(), id: doc.id });
      });
      setChats(chats);
    });
  };

  return (
    <div
      style={{
        height: 'calc(100vh - 61px)',
        marginTop: 61,
        display: 'flex',
        position: 'relative',
      }}
    >
      <ChatsList>
        {chats.map(chat => (
          <ChatItem data={chat} />
        ))}
      </ChatsList>
      {chatId === 'new' && (recepientId === 'none' ? (
        <StartMessage>Select a chat</StartMessage>
      ) : (
        <StartMessage>Start a chat</StartMessage>
      ))}
      <Chat />
    </div>
  );
};

const StartMessage = styled.p`
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-60%, -50%);
  font-family: 'Nunito', sans-serif;
  font-size: 50px;
  color: #00021a;
  font-weight: 700;
`;

const ChatsList = styled.ul`
  width: 25vw;
  height: 100%;
  overflowy: scroll;
  background-color: #00021a;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export default MessagesPage;
