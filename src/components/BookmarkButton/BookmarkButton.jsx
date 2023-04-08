import { memo, useContext } from 'react';
import { authContext } from 'context';
import { removeGameFromBookmarks, addGameToBookmarks, toastify } from 'utils';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import styled from 'styled-components';

export const BookmarkButton = memo(
  ({ isBookmark, gameData, setIsBookmark, className }) => {
    const { userId } = useContext(authContext);
    const { slug } = gameData;

    const toggleIsFavourite = () => {
      if (isBookmark) {
        removeGameFromBookmarks(userId, slug)
          .then(() => {
            setIsBookmark(prevState => !prevState);
          })
          .catch(error => {
            console.log(error);
            toastify('Something went wront. Try again later');
          });
      } else {
        addGameToBookmarks(userId, slug, gameData)
          .then(() => {
            setIsBookmark(prevState => !prevState);
          })
          .catch(error => {
            console.log(error);
            toastify('Something went wront. Try again later');
          });
      }
    };

    return (
      <Button type="button" onClick={toggleIsFavourite} className={className}>
        {className === 'game_description' && 'Bookmark'}{' '}
        {isBookmark ? (
          <BsFillBookmarkFill size="100%" />
        ) : (
          <BsBookmark size="100%" className="icon" />
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
