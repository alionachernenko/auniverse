import { memo, useContext } from 'react';
import { authContext } from 'context';
import { removeGameFromBookmarks, addGameToBookmarks, toastify } from 'utils';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';
import { useState } from 'react';

export const BookmarkButton = memo(
  ({ isBookmark, gameData, setIsBookmark, className }) => {
    const { userId } = useContext(authContext);
    const { slug } = gameData;
    const [isLoading, setIsLoading] = useState(false);

    const toggleIsFavourite = () => {
      const toggle = () => {
        if (isBookmark) return removeGameFromBookmarks(userId, slug);
        else return addGameToBookmarks(userId, slug, gameData);
      };

      setIsLoading(true);

      toggle()
        .then(() => {
          setIsBookmark(prevState => !prevState);
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
