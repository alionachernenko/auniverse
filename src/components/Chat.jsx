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
import { nanoid } from 'nanoid';
import { RiSendPlaneFill } from 'react-icons/ri';
export const Chat = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [messages, setMessages] = useState(null);
  const [messageValue, setMessageValue] = useState('');
  const [chatExists, setChatExists] = useState(false);
  const { userId } = useContext(authContext);
  const chatId = searchParams.get('id');
  const recepientId = searchParams.get('with');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
    setIsLoading(false);
  }, [recepientId, setSearchParams]);

  useEffect(() => {
    setIsLoading(true);
    if (chatId) {
      const docRef = doc(firestore, 'chats', chatId);
      onSnapshot(docRef, snapshot => {
        setMessages(snapshot.data()?.messages);
        setIsLoading(false);
        if (snapshot.data().typing && snapshot.data().typing !== userId) {
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
    const chatRef = doc(firestore, 'chats', chatId);
    updateDoc(chatRef, {
      typing: null,
    });
  };

  const onFocus = () => {
    const chatRef = doc(firestore, 'chats', chatId);
    updateDoc(chatRef, {
      typing: userId,
    });
  };

  return (
    <Window>
      {isLoading ? (
        <Loader color="#00021a" className="loader-chat" />
      ) : (
        chatExists &&
        messages && (
          <Messages>
            {messages.map(message => (
              <div key={nanoid()}>
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
      {chatId !== 'new' && isTyping === recepientId && <p>Typing...</p>}
      {(chatId !== 'new' || recepientId !== 'none') && (
        <Form onSubmit={e => onSendMessageFormSubmit(e)}>
          <textarea
            onChange={e => {
              setMessageValue(e.target.value);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <button disabled={messageValue === ''} type="submit">
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
