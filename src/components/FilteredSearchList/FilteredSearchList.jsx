import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import placeholderImage from '../../assets/images/placeholder.png';
import LinearProgress from '@mui/material/LinearProgress';

export const FilteredSearchList = ({ results, isLoading }) => {
  const location = useLocation();

  return (
    <Results>
      {isLoading && <LinearProgress className="loader" />}
      {results.length === 0 && !isLoading ? (
        <p style={{fontSize: 20, color: '#00021a'}}>No matches</p>
      ) : (
        <List>
          {results.map(({ id, background_image, slug, name }) => (
            <Item key={id}>
              <PosterWrapper>
                {background_image ? (
                  <Poster
                    src={`${background_image}`}
                    loading="lazy"
                    alt={`${name} poster`}
                  />
                ) : (
                  <Poster
                    className="poster"
                    src={placeholderImage}
                    alt="No poster here"
                  />
                )}
              </PosterWrapper>
              <Title
                to={`/catalog/${slug}`}
                state={{ from: location.pathname }}
              >
                {name}
              </Title>
            </Item>
          ))}
        </List>
      )}
    </Results>
  );
};

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Results = styled.div`
  position: absolute;
  z-index: 3;
  margin-top: 10px;
  left: 10px;
  right: 10px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  max-height: 50vh;
  padding: 10px;
  border-radius: 20px;
  overflow-x: hidden;

  background-color: white;

  overflow-y: scroll;

  & .loader {
    position: absolute;
    z-index: 4;
    top: 0;
    width: 100%;
    background-color: #00021a;

    & span {
      background-color: orange;
    }
  }
`;
const Item = styled.li`
  display: flex;
  align-items: center;
  font-weight: 900;
  height: 70px;
`;

const PosterWrapper = styled.div`
  width: 90px;
  height: 70px;
  margin-right: 10px;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled(Link)`
  color: darkblue;
`;
