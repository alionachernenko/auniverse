import { memo, useContext, useEffect, useState } from 'react';
import { fetchCommentReplies, fetchUserInfo } from 'utils';
import styled from 'styled-components';
import { Link, useLocation, useParams } from 'react-router-dom';
import { authContext } from 'context';
import avatarPlaceholder from '../../assets/images/avatar-placeholder.png';
import { RemoveCommentButton } from 'components/RemoveCommentButton/RemoveCommentButton';
import { FaReply } from 'react-icons/fa';
import { ReplyForm } from 'components/ReplyForm/ReplyForm';
import { Replies } from 'components/Replies/Replies';

export const Comment = memo(({ authorId, text, date, id, setComments }) => {
  const [authorAvatar, setAuthorAvatar] = useState();
  const [authorUsername, setAuthorUsername] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);

  const { gameSlug } = useParams();
  const { userId, isLoggedIn } = useContext(authContext);
  const location = useLocation();

  useEffect(() => {
    Promise.all([
      fetchUserInfo(authorId),
      fetchCommentReplies(`/comments/${gameSlug}/${id}/replies`),
    ])
      .then(res => {
        const [info, replies] = res;
        const { username, photoUrl } = info.val();

        setAuthorUsername(username);
        setAuthorAvatar(photoUrl ?? avatarPlaceholder);
        if (replies.val()) setReplies(Object.values(replies.val()));
      })
      .catch(error => {
        console.log(error);
      });
  }, [authorId, gameSlug, id]);

  return (
    <li style={{ width: '100%' }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <CommentWrapper key={id}>
          <Link
            to={
              authorId === userId
                ? '/profile/bookmarks'
                : `/users/${authorId}/bookmarks`
            }
            state={{ from: location.pathname }}
          >
            <AuthorInfo>
              <AvatarWrapper>
                <AuthorAvatar
                  src={authorAvatar}
                  alt={`${authorUsername}'s avatar`}
                ></AuthorAvatar>
              </AvatarWrapper>

              <AuthorName>{authorUsername}</AuthorName>
              <Date>{date}</Date>
            </AuthorInfo>
          </Link>

          <CommentText>{text}</CommentText>
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
            {userId === authorId && (
              <RemoveCommentButton id={id} setComments={setComments} />
            )}
          </Options>
        </CommentWrapper>
        {showReplyForm && <ReplyForm id={id} setReplies={setReplies} />}
        {showReplies && (
          <Replies
            replies={replies}
            commentId={id}
            mainCommentId={id}
            setCommentReplies={setReplies}
          />
        )}
      </div>
    </li>
  );
});

const Options = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: center;
  right: 20px;
  gap: 10px;
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

const CommentWrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  border: 2px solid white;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const AuthorName = styled.p`
  color: white;
  font-family: 'Nunito', sans-serif;
`;

const CommentText = styled.p`
  color: white;
  font-family: 'Nunito', sans-serif;
`;

const AuthorInfo = styled.div`
  margin-bottom: 10px;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const AvatarWrapper = styled.div`
  height: 60px;
  width: 60px;
  overflow: hidden;
  position: relative;
  border-radius: 100px;
`;

const AuthorAvatar = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
`;

const Date = styled.p`
  font-family: inherit;
  color: #ffffffb8;
  margin-left: auto;
`;

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
