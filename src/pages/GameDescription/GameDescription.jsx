import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Loader,
  StoresList,
  BookmarkButton,
  Container,
  Comments,
  ErrorComponent,
  GameOverview,
  GameScreenshots,
  GoBackLink,
} from 'components';
import { authContext } from 'context';

import styled from 'styled-components';
import {
  fetchBookmarks,
  fetchComments,
  fetchGameById,
  fetchScreenshots,
  fetchStores,
} from 'utils';

const GameDescription = () => {
  const { isLoggedIn, userId } = useContext(authContext);
  const [isBookmark, setIsBookmark] = useState();

  const [title, setTitle] = useState('');
  const [screenshots, setScreenshots] = useState([]);
  const [description, setDescription] = useState('');
  const [stores, setStores] = useState([]);
  const [year, setYear] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [gameData, setGameData] = useState({});
  const [comments, setComments] = useState([]);
  const [isError, setIsError] = useState(false);

  const { gameSlug } = useParams();

  useEffect(() => {
    Promise.all([
      fetchGameById(gameSlug),
      fetchScreenshots(gameSlug),
      fetchComments(gameSlug),
      fetchBookmarks(userId),
      fetchStores(gameSlug),
    ])
      .then(res => {
        const [game, screenshots, comments, bookmarks, stores] = res;
        const { data } = game;
        const { name, description_raw, released } = data;
        const { results } = screenshots.data;

        setGameData(data);
        setTitle(name);
        setDescription(description_raw);
        setStores(stores.data.results);
        setYear(released);
        setScreenshots(results);

        if (bookmarks.val()) {
          setIsBookmark(
            Object.keys(bookmarks.val()).some(el => el === gameSlug)
          );
        }

        if (comments.val())
          setComments(
            Object.values(comments.val()).sort((a, b) => b.date - a.date)
          );

        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [gameSlug, userId]);

  return (
    <Page>
      <Container>
        {isLoading ? (
          <Loader color={'white'} />
        ) : isError ? (
          <ErrorComponent />
        ) : (
          <>
            <GoBackLink />
            <div style={{ display: 'flex' }}>
              <Info>
                <div>
                  <Meta>
                    <Title>{title}</Title>
                    {year && <Year>{year.slice(0, 4)}</Year>}
                    {isLoggedIn && (
                      <BookmarkButton
                        gameData={gameData}
                        isBookmark={isBookmark}
                        setIsBookmark={setIsBookmark}
                        className="game_description"
                      />
                    )}
                  </Meta>
                  {description && <GameOverview description={description} />}
                </div>
                {stores && <StoresList stores={stores} data={gameData} />}
              </Info>
            </div>
            {screenshots && <GameScreenshots screenshots={screenshots} />}
            <Comments setComments={setComments} comments={comments} />
          </>
        )}
      </Container>
    </Page>
  );
};

const Page = styled.div`
  padding: 30px;
  position: relative;
  box-sizing: border-box;
  margin-top: 61px;

  min-height: calc(100vh - 61px);
  background-size: cover;
  background-position: top;
  display: flex;
  flex-direction: column;
  background-color: #00021a;

  @media screen and (min-width: 768px) {
    padding: 60px;
  }
`;

const Info = styled.div`
  display: flex;
  gap: 40px;
  height: auto;
  box-sizing: border-box;
  margin-bottom: 60px;
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 30px;
  }

  @media screen and (min-width: 1200px) {
    width: 1130px;
  }
`;

const Meta = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  position: relative;

  @media screen and (min-width: 1200px) {
    margin-bottom: 20px;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }
`;
const Title = styled.h1`
  padding: 10px 0;
  border-bottom: 1px solid orange;
  max-width: 700px;

  font-size: 35px;
  font-weight: 700;
  text-align: left;
  color: white;

  @media screen and (min-width: 1200px) {
    border-bottom: 0;
    padding: 0;
    font-size: 50px;
    border-right: 1px solid orange;
    padding-right: 20px;
  }
`;
const Year = styled.p`
  color: white;
  font-weight: 700;
  text-align: center;
  font-size: 30px;

  @media screen and (min-width: 768px) and (max-width: 1199px) {
    margin-right: 0;
  }

  @media screen and (min-width: 1200px) {
    font-size: 50px;
  }
`;
export default GameDescription;
