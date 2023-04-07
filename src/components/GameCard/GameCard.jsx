import { Link, useLocation } from 'react-router-dom';
import placeholderImage from 'assets/images/placeholder.png';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { authContext } from 'context';
import { fetchBookmarks } from 'utils';
import { BookmarkButton } from 'components';

export const GameCard = ({ data, className }) => {
  const location = useLocation();
  const [isBookmark, setIsBookmark] = useState();
  const { userId, isLoggedIn } = useContext(authContext);

  const { name, released, genres, background_image, slug, rating } = data;

  useEffect(() => {
    if (isLoggedIn) {
      fetchBookmarks(userId).then(bookmarks => {
        if (bookmarks.val()) {
          setIsBookmark(Object.keys(bookmarks.val()).some(el => el === slug));
        }
      });
    }
  }, [isLoggedIn, slug, userId]);

  return (
    <CardWrapper className={`${className}`}>
      <Link
        style={{ display: 'flex', flex: 1 }}
        to={`/catalog/${slug}`}
        aria-label={`Read more about ${name}`}
        state={{ from: `${location.pathname}${location.search}` }}
      >
        <Card className={`${className}`}>
          {background_image ? (
            <img
              className="poster"
              loading="lazy"
              src={background_image}
              alt={`${name} poster`}
              width={500}
              height={350}
            />
          ) : (
            <img
              className="poster"
              src={placeholderImage}
              alt="No poster here"
            />
          )}
          <div className="description">
            <Title>{name}</Title>
            {released && <p className="year">{released.slice(0, 4)}</p>}
            {genres && (
              <Genres>
                {genres.map(({ id, name }) => (
                  <Genre key={id}>{name}</Genre>
                ))}
              </Genres>
            )}
          </div>
          <Rating className="rating">{rating}</Rating>
        </Card>
      </Link>
      {isLoggedIn && (
        <BookmarkButton
          isBookmark={isBookmark}
          gameData={data}
          setIsBookmark={setIsBookmark}
          className={`gamecard_${className}`}
        />
      )}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  background-color: #00021a;

  clip-path: polygon(
    11% 0,
    70% 0%,
    100% 0,
    100% 88%,
    88% 100%,
    0 100%,
    0 67%,
    0 11%
  );

  &.catalog {
    transition: 250ms transform ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  &.slider {
    width: fit-content;
  }
`;

const Card = styled.div`
  &.catalog {
    height: auto;

    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    color: white;

    & .poster {
      height: 250px;
      width: 100%;

      object-fit: cover;
      transition: 500ms all ease;
    }

    & .description {
      padding: 15px 45px 15px 15px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      flex-grow: 1;
    }
  }

  &.slider {
    max-width: 500px;
    height: 350px;
    position: relative;
    overflow: hidden;
    width: fit-content;

    & .year {
      color: white;
    }

    & .rating,
    & .year {
      display: none;
    }

    & .poster {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: 500ms all ease;
    }

    & .description {
      width: 50%;
      height: 100%;
      padding: 0 10px;
      box-sizing: border-box;

      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 15px;

      position: absolute;
      top: 0;
      right: 100%;
      flex-grow: 1;

      background-color: #00021a;

      transition: 250ms right ease;
    }

    &:hover .poster {
      height: 100%;
      filter: blur(2px);
    }

    &:hover .description {
      right: 50%;
    }
  }
`;

const Genres = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  font-size: 15;
  letter-spacing: 0.05em;

  color: #f0f0f0;
`;

const Genre = styled.li`
  padding: 0 5px 0 0;

  &:not(:last-child) {
    border-right: 1px solid orange;
  }
`;

const Title = styled.p`
  color: white;

  font-size: 120%;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  white-space: normal;
  word-break: break-word;
`;

const Rating = styled.p`
  display: flex;
  align-items: center;
  padding: 10px 10px 5px 10px;

  position: absolute;
  top: 0;
  right: 40px;

  font-size: 20px;
  font-weight: 700;

  color: white;
  background-color: #050b2b;
  transition: 400ms top ease;
`;
