import { useContext } from 'react';
import { authContext } from 'context';
import { leaveComment } from 'utils';
import { Comment } from 'components';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';
import { nanoid } from 'nanoid';

const formatDateAndTime = value => {
  if (value) return new Date(value).toISOString().slice(0, 10);
};

export const Comments = ({ comments, setComments }) => {
  const { userId, isLoggedIn } = useContext(authContext);
  const { gameSlug } = useParams();

  const onFormSubmit = e => {
    const commentId = nanoid();
    const date = new Date();
    e.preventDefault();
    console.log(date.getDate());

    const commentInput = e.target.elements.comment;
    const commentText = commentInput.value;

    leaveComment(userId, gameSlug, commentText, commentId);
    setComments(prev => [
      {
        commentId,
        author: userId,
        text: commentText,
        date: formatDateAndTime(date.getTime()),
      },
      ...prev,
    ]);

    e.target.reset();
  };

  return (
    <Section>
      {!isLoggedIn ? (
        <Message>You must be logged in to comment</Message>
      ) : (
        <Form onSubmit={e => onFormSubmit(e)}>
          <Input
            rows={5}
            required
            name="comment"
            placeholder="What do you think about this game?"
          />
          <SubmitButton type="submit">Comment</SubmitButton>
        </Form>
      )}
      {comments.length !== 0 && (
        <CommentsList>
          {comments.map(({ author, id, text, date }) => {
            return (
              <Comment
                authorId={author}
                id={id}
                key={id}
                text={text}
                date={formatDateAndTime(date)}
                setComments={setComments}
              />
            );
          })}
        </CommentsList>
      )}
    </Section>
  );
};

const Message = styled.p`
  color: white;
  font-size: 30px;
  font-family: 'Nunito', sans-serif;
  margin-bottom: 20px;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 1200px) {
    align-items: flex-start;
  }
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  position: relative;
  z-index: 1;

  @media screen and (min-width: 768px) {
    width: 542px;
  }
`;

const CommentsList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media screen and (min-width: 1200px) {
    align-items: flex-start;
  }
`;

const Input = styled.textarea`
  width: 100%;
  resize: vertical;

  padding: 10px 20px;
  border-radius: 20px;

  font-family: 'Nunito', sans-serif;
  font-size: 17px;

  &::placeholder {
    font-family: 'Nunito', sans-serif;
  }
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
