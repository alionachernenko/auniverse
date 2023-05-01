import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { BookmarkButton } from 'components';

export const Bookmarks = memo(({ bookmarks, setBookmarks }) => {
  const location = useLocation();

  return (
    <Block>
      {bookmarks.length === 0 ? (
        <p>No bookmarks</p>
      ) : (
        <List>
          {bookmarks.map(bookmark => {
            const { background_image, name, slug, id } = bookmark;
            return (
              <Bookmark key={id}>
                <Poster src={`${background_image}`} alt={`${name} poster`} />
                <Title
                  to={`/catalog/${slug}`}
                  state={{ from: location.pathname }}
                >
                  {name}
                </Title>
                {location.pathname === '/profile/bookmarks' && (
                  <BookmarkButton
                    gameData={bookmark}
                    className="bookmarks_list"
                    setBookmarks={setBookmarks}
                  />
                )}
              </Bookmark>
            );
          })}
        </List>
      )}
    </Block>
  );
});

const Block = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 1200px) {
    align-items: flex-start;
  }
`;

const List = styled.ul`
  height: 100%;
  padding: 10px;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;

  @media screen and (min-width: 1200px) {
    width: 470px;
  }
`;
const Bookmark = styled.li`
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  position: relative;

  display: flex;
  align-items: center;

  font-weight: 900;

  background-color: white;
`;

const Poster = styled.img`
  width: 90px;
  height: 67px;
  border-radius: 10px;
  margin-right: 10px;

  object-fit: cover;
`;

const Title = styled(Link)`
  color: black;
`;
