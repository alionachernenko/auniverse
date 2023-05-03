import { AiFillDelete } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { removeReply } from 'utils';

export const RemoveReplyButton = ({
  id,
  parentId,
  mainCommentId,
  setParentReplies,
  setCommentReplies,
}) => {
  const { gameSlug } = useParams();

  const onRemoveButtonClick = id => {
    const ref =
      parentId === mainCommentId
        ? `/comments/${gameSlug}/${mainCommentId}/replies/${id}`
        : `/comments/${gameSlug}/${mainCommentId}/replies/${parentId}/replies/${id}`;
    removeReply(ref);

    if (setParentReplies)
      setParentReplies(prev => prev.filter(reply => reply.replyId !== id));
    else setCommentReplies(prev => prev.filter(reply => reply.replyId !== id));
  };

  return (
    <Button
      onClick={() => {
        onRemoveButtonClick(id);
      }}
    >
      <AiFillDelete size="100%" />
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
