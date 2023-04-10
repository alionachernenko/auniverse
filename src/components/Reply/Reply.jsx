import { useContext, useEffect, useState } from 'react';
import { fetchCommentReplies, fetchUserInfo } from 'utils';
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png';
import { Link, useLocation, useParams } from 'react-router-dom';
import { authContext } from 'context';
import { FaReply } from 'react-icons/fa';
import styled from 'styled-components';
import { ReplyForm } from 'components/ReplyForm/ReplyForm';
import { Replies } from 'components/Replies/Replies';
import { memo } from 'react';
import { RemoveReplyButton } from 'components/RemoveReplyButton/RemoveReplyButton';

const formatDateAndTime = value => {
  return new Date(value).toISOString().slice(0, 10);
};

export const Reply = memo(
  ({
    reply,
    parentId,
    mainCommentId,
    parentReplies,
    setParentReplies,
    setCommentReplies,
  }) => {
    const [authorAvatar, setAuthorAvatar] = useState();
    const [authorUsername, setAuthorUsername] = useState('');
    const { userId, isLoggedIn } = useContext(authContext);
    const location = useLocation();
    const [replies, setReplies] = useState([]);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const { gameSlug } = useParams();
    const [showReplies, setShowReplies] = useState(false);

    const { text, author, replyId, date } = reply;

    useEffect(() => {
      fetchUserInfo(author).then(info => {
        const { username, photoUrl } = info.val();
        setAuthorUsername(username);
        setAuthorAvatar(photoUrl ?? avatarPlaceholder);
      });

      fetchCommentReplies(
        `/comments/${gameSlug}/${mainCommentId}/replies/${replyId}/replies`
      ).then(res => {
        if (res.val()) setReplies(Object.values(res.val()));
      });
    }, [author, gameSlug, mainCommentId, parentId, replyId]);

    return (
      <>
        <ReplyWrapper>
          <Link
            to={
              author === userId
                ? '/profile/bookmarks'
                : `/users/${author}/bookmarks`
            }
            state={{ from: location.pathname }}
          >
            <AuthorInfo>
              <AvatarWrapper>
                <AuthorAvatar src={authorAvatar}></AuthorAvatar>
              </AvatarWrapper>
              <p>{authorUsername}</p>
              <ReplyDate>{formatDateAndTime(date)}</ReplyDate>
            </AuthorInfo>
          </Link>
          <ReplyText>{text}</ReplyText>
          <Options>
            {replies.length !== 0 && (
              <ShowRepliesButton
                onClick={() => {
                  setShowReplies(prev => !prev);
                }}
              >
                {showReplies ? 'Hide' : 'Show'} replies ({replies.length})
              </ShowRepliesButton>
            )}
            {isLoggedIn && (
              <ReplyButton
                onClick={() => {
                  setShowReplyForm(prev => !prev);
                }}
              >
                <FaReply size="100%" />
              </ReplyButton>
            )}
            {userId === author && (
              <RemoveReplyButton
                parentReplies={parentReplies}
                setParentReplies={setParentReplies}
                parentId={parentId}
                id={replyId}
                mainCommentId={mainCommentId}
                setCommentReplies={setCommentReplies}
              />
            )}
          </Options>
        </ReplyWrapper>
        {showReplyForm && (
          <ReplyForm
            commentId={parentId}
            parentReplyId={replyId}
            setReplies={setReplies}
            id={replyId}
          />
        )}
        {showReplies && (
          <Replies
            replies={replies}
            commentId={replyId}
            mainCommentId={mainCommentId}
            setReplies={setReplies}
            setCommentReplies={setCommentReplies}
          />
        )}
      </>
    );
  }
);

const ShowRepliesButton = styled.button`
  color: white;
  font-size: 15px;
  font-family: 'Nunito', sans-serif;
  background: none;
  border: none;
  padding: 0;
  transition: 150ms all ease;

  &:hover {
    color: #ffffffb8;
  }
`;

const Options = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  align-items: center;
  right: 10px;
  gap: 10px;
`;

const ReplyDate = styled.p`
  margin-left: auto;
`;

const ReplyButton = styled.button`
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

const ReplyWrapper = styled.li`
  width: 100%;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #2f3149;
  border-radius: 20px;

  &.deleted {
    display: none;
  }
`;

const ReplyText = styled.p`
  color: white;
`;

const AuthorInfo = styled.div`
  margin-bottom: 10px;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const AvatarWrapper = styled.div`
  height: 40px;
  width: 40px;
  overflow: hidden;
  position: relative;
  border-radius: 100px;
`;

const AuthorAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
