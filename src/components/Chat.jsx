import { firestore } from 'config/firebase';
import { authContext } from 'context';
import { query } from 'firebase/database';
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { addNewMessage, createNewChat } from 'utils';
import { Loader } from './Loader/Loader';
import { RiSendPlaneFill } from 'react-icons/ri';
import { nanoid } from 'nanoid';
import { TypingDots } from './TypingDots/TypingDots';

export const Chat = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [messages, setMessages] = useState(null);
  const [messageValue, setMessageValue] = useState('');
  const [chatExists, setChatExists] = useState(false);
  const { userId } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatId = searchParams.get('id');
  const recepientId = searchParams.get('with');

  useEffect(() => {
    const checkChatExists = async () => {
      const q = query(
        collection(firestore, 'chats'),
        where('members', 'array-contains', recepientId)
      );
      const querySnapshot = await getDocs(q);
      setChatExists(!querySnapshot.empty);
      if (!querySnapshot.empty)
        setSearchParams({
          id: querySnapshot.docs[0].id,
          with: recepientId || 'none',
        });
      else setSearchParams({ id: 'new', with: recepientId || 'none' });
    };
    checkChatExists();
  }, [recepientId, setSearchParams]);

  useEffect(() => {
    if (chatId && chatId !== 'new') {
      const docRef = doc(firestore, 'chats', chatId);
      onSnapshot(docRef, snapshot => {
        setMessages(snapshot.data()?.messages);
        if (snapshot.data()?.typing && snapshot.data()?.typing !== userId) {
          setIsTyping(snapshot.data().typing);
        } else setIsTyping(false);
      });
    }
  }, [chatExists, chatId, userId]);

  const onSendMessageFormSubmit = e => {
    setIsLoading(true);
    const message = {
      senderId: userId,
      text: messageValue,
      id: nanoid(),
    };

    e.preventDefault();
    if (chatId === 'new') {
      createNewChat(userId, recepientId, message).then(res =>
        setSearchParams({ id: res.id, with: recepientId })
      );
    } else {
      addNewMessage(chatId, message);
    }
    e.target.reset();
    setIsLoading(false);
  };

  const onBlur = () => {
    if (chatId && chatId !== 'new') {
      const chatRef = doc(firestore, 'chats', chatId);
      updateDoc(chatRef, {
        typing: null,
      });
    }
  };

  const onFocus = () => {
    if (chatId && chatId !== 'new') {
      const chatRef = doc(firestore, 'chats', chatId);
      updateDoc(chatRef, {
        typing: userId,
      });
    }
  };

  return (
    <Window>
      {chatExists && isLoading ? (
        <Loader color="#00021a" className="loader-chat" />
      ) : (
        messages && (
          <Messages>
            {messages.map(message => (
              <div key={message.id}>
                {message.senderId === userId && (
                  <p
                    style={{
                      fontSize: 12,
                      color: 'grey',
                      marginBottom: 2,
                      marginLeft: 20,
                    }}
                  >
                    You
                  </p>
                )}
                <Message
                  className={message.senderId === userId ? 'send' : 'received'}
                >
                  {message.text}
                </Message>
              </div>
            ))}
          </Messages>
        )
      )}
      {(chatId !== 'new' || recepientId !== 'none') && (
        <Form onSubmit={e => onSendMessageFormSubmit(e)}>
          {chatId !== 'new' && isTyping === recepientId && (
            <TypingDots size={10} color="#00021a" className="large" />
          )}
          <textarea
            onChange={e => {
              setMessageValue(e.target.value);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <button disabled={!messageValue.trim().length} type="submit">
            <RiSendPlaneFill size="100%" color="white" />
          </button>
        </Form>
      )}
    </Window>
  );
};

const Window = styled.div`
  height: calc(100vh - 61px);
  width: 100%;
  display: grid;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
`;
const Message = styled.li`
  width: 40%;
  padding: 12px;
  border-radius: 20px;
  font-family: 'Nunito', sans-serif;
  word-break: break-all;
  &.received {
    color: #00021a;
    border: 1px solid orange;
  }

  &.send {
    background-color: aliceblue;
    color: #00021a;
    border: 1px solid #00021a;
  }
`;

const Form = styled.form`
  align-self: end;
  height: auto;
  width: auto;
  display: flex;
  justify-content: space-between;
  position: relative;

  & textarea {
    max-width: 100%;
    padding: 10px 20px;
    font-size: 17px;
    box-sizing: border-box;
    flex: 1;
    border: 1px solid #00021a;
    font-family: 'Nunito', sans-serif;
    min-height: 70px;
    border-radius: 30px;
    resize: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  & button {
    width: 50px;
    height: 50px;
    margin-left: 5px;
    background-color: orange;
    border: none;
    border-radius: 100%;
    padding: 10px;

    &:disabled {
      background-color: grey;
    }
  }
`;

const Messages = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
`;
