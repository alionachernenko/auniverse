import { memo, useContext } from 'react';
import { authContext } from 'context';
import { removeGameFromBookmarks, addGameToBookmarks, toastify, fetchBookmarks} from 'utils';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const BookmarkButton = memo(
  ({ gameData, className, setBookmarks }) => {
    const location = useLocation()
    const { slug } = gameData;
    const [isLoading, setIsLoading] = useState(false);
    const { userId, isLoggedIn } = useContext(authContext);
    const [isBookmark, setIsBookmark] = useState(() => location.pathname === '/profile/bookmarks')

    useEffect(() => {
    if (isLoggedIn) {
      fetchBookmarks(userId).then(bookmarks => {
        if (bookmarks.val()) {
          setIsBookmark(Object.keys(bookmarks.val()).some(el => el === slug));
        }
      });
    }
  }, [isLoggedIn, setIsBookmark, slug, userId]);

    const toggleIsFavourite = () => {
      const toggle = () => {
        if (isBookmark) return removeGameFromBookmarks(userId, slug);
        else return addGameToBookmarks(userId, slug, gameData);
      };

      setIsLoading(true);

      toggle()
        .then(() => {
          setIsBookmark(prevState => !prevState);

          if(isBookmark) {
            setBookmarks(prev => prev.filter(bookmark => bookmark.id !== gameData.id))
          }
        })
        .catch(error => {
          console.log(error);
          toastify('Something went wront. Try again later');
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    return (
      <Button type="button" onClick={toggleIsFavourite} className={className}>
        {className === 'game_description' && 'Bookmark'}
        {isLoading ? (
          <Oval
            width="100%"
            height="100%"
            color="#FF6600"
            secondaryColor="orange"
            wrapperStyle={{ width: '100%', height: '100%' }}
          />
        ) : isBookmark ? (
          <BsFillBookmarkFill size="100%" style={{ padding: 3 }} />
        ) : (
          <BsBookmark size="100%" className="icon" style={{ padding: 3 }} />
        )}
      </Button>
    );
  }
);

const Button = styled.button`
  height: 40px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  font-family: 'Nunito', sans-serif;
  font-size: 17px;

  color: white;
  background-color: rgba(84, 84, 84, 0.5);

  transition: 250ms all ease;

  & div {
    padding: 0;
  }

  &.bookmarks_list {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    background-color: rgb(84, 84, 84);
    padding: 10px;

    &:hover {
      background-color: rgba(84, 84, 84, 0.8);
    }
  }

  &.gamecard_catalog {
    position: absolute;
    top: 265px;
    right: 15px;
    padding: 7px;
    height: 30px;
    z-index: 1111111111;

    &:hover {
      transform: scale(1.2);
    }
  }

  &.gamecard_slider {
    display: none;
  }

  &:hover {
    background-color: rgba(84, 84, 84, 0.4);
  }
`;
