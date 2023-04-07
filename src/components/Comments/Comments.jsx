import { useContext } from 'react';
import { authContext } from 'context';
import { leaveComment } from 'utils';
import { Comment } from 'components';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

const getAndFormatAuthorId = comment => {
  return Object.keys(comment)[0].split('-')[0];
};

const getCommentText = comment => {
  return Object.values(comment)[0];
};

export const Comments = ({ comments, setComments }) => {
  const { userId, isLoggedIn } = useContext(authContext);
  const { gameSlug } = useParams();

  const onFormSubmit = e => {
    e.preventDefault();

    const commentInput = e.target.elements.comment;
    const commentText = commentInput.value;

    leaveComment(userId, gameSlug, commentText);
    setComments(prev => [...prev, { [userId]: commentText }]);

    commentInput.value = '';
  };

  return (
    <Section>
      {!isLoggedIn ? (
        <Message>You must be logged in to comment</Message>
      ) : (
        <Form onSubmit={e => onFormSubmit(e)}>
          <Input
            required
            name="comment"
            placeholder="What do you think about this game?"
          />
          <SubmitButton type="submit">Comment</SubmitButton>
        </Form>
      )}
      {comments.length !== 0 && (
        <CommentsList>
          {comments.map(comment => (
            <Comment
              authorId={getAndFormatAuthorId(comment)}
              key={Object.keys(comment)[0]}
              text={getCommentText(comment)}
            />
          ))}
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media screen and (min-width: 1200px) {
    align-items: flex-start;
  }
`;

const Input = styled.textarea`
  width: 100%;
  min-height: 80px !important;
  resize: vertical;

  padding: 10px 20px;
  border-radius: 20px;

  font-family: 'Nunito', sans-serif;
  font-size: 17px;

  @media screen and (min-width: 768px) {
    width: 500px;
    min-height: 30px;
  }

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
