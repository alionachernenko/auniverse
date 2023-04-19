import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import placeholderImage from '../../assets/images/placeholder.png';

export const FilteredSearchList = ({ results }) => {
  const location = useLocation();
  return (
    <FilteredResults>
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
          <Title to={`/catalog/${slug}`} state={{ from: location.pathname }}>
            {name}
          </Title>
        </Item>
      ))}
    </FilteredResults>
  );
};
const FilteredResults = styled.ul`
  width: calc(100% - 20px);
  box-sizing: border-box;
  max-height: 50vh;
  padding: 10px;
  border-radius: 20px;

  display: flex;
  flex-direction: column;

  gap: 10px;

  position: absolute;
  z-index: 3;
  margin-top: 10px;
  left: 10px;
  right: 10px;

  background-color: white;

  overflow-y: scroll;
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
