import { RiDeleteBinLine } from 'react-icons/ri';
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
      <RiDeleteBinLine size="100%" fill="#ffffffb8" />
    </Button>
  );
};

const Button = styled.button`
  position: absolute;
  right: 20px;
  bottom: 20px;
  padding: 0;
  background: none;
  border: none;
  width: 20px;
  height: 20px;
`;
