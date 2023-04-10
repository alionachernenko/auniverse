import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from 'context';
import { nanoid } from 'nanoid';
import { leaveReply } from 'utils';
import { serverTimestamp } from 'firebase/database';
import styled from 'styled-components';

const formatDateAndTime = value => {
  return new Date(value).toISOString().slice(0, 10);
};

export const ReplyForm = ({ id, setReplies, parentReplyId, commentId }) => {
  const { userId } = useContext(authContext);
  const { gameSlug } = useParams();

  const onFormSubmit = e => {
    e.preventDefault();

    const date = new Date();

    const text = e.target.elements.text.value;
    const replyId = nanoid();
    const replyData = {
      replyId,
      author: userId,
      text,
      date: serverTimestamp(),
    };

    console.log(parentReplyId);

    const ref = parentReplyId
      ? `/comments/${gameSlug}/${commentId}/replies/${parentReplyId}/replies/${replyId}`
      : `/comments/${gameSlug}/${id}/replies/${replyId}`;

    leaveReply(ref, replyData);
    setReplies(prev => [
      {
        ...replyData,
        date: formatDateAndTime(date.getTime()),
      },
      ...prev,
    ]);

    e.target.reset();
  };

  return (
    <Form onSubmit={e => onFormSubmit(e)}>
      <Input type="text" name="text" required rows={1} />
      <SubmitButton type="submit">Reply</SubmitButton>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  position: relative;
  z-index: 1;
`;

const Input = styled.textarea`
  width: 100%;
  resize: vertical;

  padding: 10px 20px;
  border-radius: 20px;

  font-family: 'Nunito', sans-serif;
  font-size: 17px;
`;

const SubmitButton = styled.button`
  padding: 4px 10px;
  border: none;
  border-radius: 12px;

  position: absolute;
  bottom: 10px;
  right: 10px;

  font-family: 'Nunito', sans-serif;
  font-size: 15px;

  background-color: #00021a;
  color: white;
`;
