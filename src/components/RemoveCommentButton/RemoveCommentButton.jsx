import { AiFillDelete } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { removeComment } from 'utils';

export const RemoveCommentButton = ({ id, setComments }) => {
  const { gameSlug } = useParams();
  console.log(gameSlug);

  const onRemoveButtonClick = commentId => {
    removeComment(gameSlug, id);
    setComments(prev => prev.filter(({ id }) => id !== commentId));
  };
  return (
    <Button onClick={() => onRemoveButtonClick(id)}>
      <AiFillDelete size="100%" fill="#ffffffb8" />
    </Button>
  );
};

const Button = styled.button`
  padding: 0;
  background: none;
  border: none;
  width: 20px;
  height: 20px;

  & svg {
    fill: #ffffffb8;
    transition: 150ms all ease;

    &:hover {
      fill: white;
    }
  }
`;
