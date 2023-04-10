import { Reply } from 'components/Reply/Reply';
import { memo } from 'react';
import styled from 'styled-components';

export const Replies = memo(
  ({ replies, commentId, mainCommentId, setReplies, setCommentReplies }) => {
    return (
      <>
        {replies.length !== 0 && (
          <List>
            {replies.map(reply => (
              <Reply
                reply={reply}
                parentReplies={replies}
                mainCommentId={mainCommentId}
                parentId={commentId}
                setParentReplies={setReplies}
                setCommentReplies={setCommentReplies}
              />
            ))}
          </List>
        )}
      </>
    );
  }
);

const List = styled.ul`
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
