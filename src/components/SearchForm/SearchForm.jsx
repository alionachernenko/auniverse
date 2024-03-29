import { memo, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchGameBySearchQuery } from 'utils/rawg-api';
import { SearchFilter, FilteredSearchList } from 'components';

import styled, { keyframes } from 'styled-components';
import { MdClose } from 'react-icons/md';
import { searchFormContext } from 'context';

export const SearchForm = memo(({ className }) => {
  const {value, setValue} = useContext(searchFormContext)
  const [filteredGames, setFilteredGames] = useState([]);
  const [showFilteredResults, setShowFilteredResults] = useState(false);
  const [ordering, setOrdering] = useState(null);
  const [genre, setGenre] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [developer, setDeveloper] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (value || ordering || genre || platform || developer) {
      setIsLoading(true);
      setShowFilteredResults(true);
      fetchGameBySearchQuery(value, 1, ordering, genre, platform, developer)
        .then(({ data: { results } }) => {
          setFilteredGames(results);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
          setIsLoading(false);
        });
    } else setShowFilteredResults(false);
  }, [genre, ordering, location.pathname, value, platform, developer]);

  const onFormSubmit = e => {
    e.preventDefault();
    const { query, ordering, genre, platform, developer } = e.target.elements;

    const searchParams = new URLSearchParams();

    searchParams.set('page', 1);

    if (query.value) searchParams.set('query', query.value);
    if (ordering && ordering.value !== 'None')
      searchParams.set('ordering', ordering.value);
    if (genre && genre.value !== 'All') searchParams.set('genre', genre.value);
    if (platform && platform.value !== 'All')
      searchParams.set('platform', platform.value);
    if (developer && developer.value !== 'All')
      searchParams.set('developer', developer.value);

    if (location.pathname !== '/auniverse/catalog') {
      navigate(`/catalog?${searchParams.toString()}`);
    }

    setShowFilteredResults(false);
  };

  const onInputChange = e => {
    setValue(e.target.value);
  };

  return (
    <Form onSubmit={onFormSubmit} className={className}>
      <label style={{ display: 'none' }} htmlFor="search-input">
        Search games
      </label>
      <div className="input-wrapper">
        <Input
          id="search-input"
          placeholder="Enter a game title"
          value={value}
          type="text"
          name="query"
          onChange={onInputChange}
          className={className}
        />
        {value && (
          <ClearButton type="button" onClick={() => setValue('')}>
            <MdClose size="100%" />
          </ClearButton>
        )}
        <Button type="submit" className={className}>
          GO
        </Button>
      </div>
      {location.pathname === '/catalog' && (
        <SearchFilter
          setDeveloper={setDeveloper}
          setOrdering={setOrdering}
          setGenre={setGenre}
          setPlatform={setPlatform}
        />
      )}
      {showFilteredResults && (
        <FilteredSearchList results={filteredGames} isLoading={isLoading}/>
      )}
    </Form>
  );
});

const Form = styled.form`
  font-family: 'Nunito', sans-serif;
  position: relative;

  &.catalog {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    height: auto;
    padding: 0 10px;

    @media screen and (min-width: 768px) {
      width: 500px;
    }

    & .input-wrapper {
      position: relative;
      margin-bottom: 10px;
      height: 40px;
    }
  }

  &.header {
    height: 100%;
    width: 400px;
    margin: 0;

    & .input-wrapper {
      position: relative;
      height: 30px;
    }

    @media screen and (max-width: 1199px) {
      display: none;
    }
  }
`;
const Input = styled.input`
  width: 100%;
  padding-right: 110px;
  padding-left: 10px;
  border-radius: 30px;
  border: none;
  box-sizing: border-box;

  font-family: inherit;

  &.catalog {
    height: 100%;
    font-size: 20px;
  }

  &.header {
    height: 100%;
    font-size: 15px;
  }
`;

const Button = styled.button`
  position: absolute;
  border-radius: 30px;
  border-color: transparent;
  background-color: orange;
  font-family: inherit;
  color: darkblue;
  font-weight: 900;
  cursor: pointer;
  transition: 250ms transform ease;

  &.catalog {
    height: 36px;
    top: 2px;
    right: 2px;
    font-size: 20px;
    transform: scale(1);

    @media screen and (min-width: 1200px) {
      &:hover {
        transform: scale(1.1);
      }
    }
  }

  &.header {
    height: 90%;
    right: 1px;
    font-size: 15px;
    top: 50%;
    transform: translateY(-50%) scale(1);

    @media screen and (min-width: 1200px) {
      &:hover {
        transform: translateY(-50%) scale(1.1);
      }
    }
  }
`;

const showClearButton = keyframes`
  from {
    transform: translateY(-50%) scale(0);
    opacity: 0;
  }

  to {
    transform: translateY(-50%) scale(1);
    opacity: 1;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 12%;
  top: 50%;
  border: none;
  background-color: transparent;
  padding: 0;
  transform: translateY(-50%) scale(1);

  display: flex;
  align-items: center;
  height: 70%;

  animation: ${showClearButton} 100ms ease;
`;
