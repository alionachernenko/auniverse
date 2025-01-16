import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchDevelopers, fetchGenres, fetchPlatforms } from 'utils';

const sortFilterValues = values => {
  return values.sort((a, b) => a.name.localeCompare(b.name));
};

export const SearchFilter = ({
  setOrdering,
  setGenre,
  setPlatform,
  setDeveloper,
}) => {
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    Promise.all([fetchGenres(), fetchPlatforms(), fetchDevelopers()]).then(
      res => {
        const [genresRes, platformsRes, developersRes] = res;
        setGenres(sortFilterValues(genresRes.data.results));
        setPlatforms(sortFilterValues(platformsRes.data.results));
        setDevelopers(sortFilterValues(developersRes.data.results));
      }
    );
  }, []);
  return (
    <Filters>
      <Filter>
        <Label htmlFor="order_select">Order by:</Label>
        <FilterOptions
          name="ordering"
          id="order_select"
          onChange={e => {
            setOrdering(e.target.value === 'None' ? null : e.target.value);
          }}
        >
          <option>None</option>
          <option value="added">Added</option>
          <option value="created">Created</option>
          <option value="released">Released</option>
          <option value="metacritic">Metacritic</option>
          <option value="name">Name</option>
          <option value="rating">Rating</option>
          <option value="updated">Updated</option>
        </FilterOptions>
      </Filter>
      <Filter>
        <Label htmlFor="genre_select">Genre:</Label>
        <FilterOptions
          name="genre"
          id="genre_select"
          onChange={e => {
            setGenre(e.target.value === 'All' ? null : e.target.value);
          }}
        >
          <option>All</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.slug}>
              {genre.name}
            </option>
          ))}
        </FilterOptions>
      </Filter>
      <Filter>
        <Label htmlFor="platform_select">Platform:</Label>
        <FilterOptions
          name="platform"
          id="platform_select"
          onChange={e => {
            setPlatform(e.target.value === 'All' ? null : e.target.value);
          }}
        >
          <option>All</option>
          {platforms.map(platform => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </FilterOptions>
      </Filter>
      <Filter>
        <Label htmlFor="developer_select">Developer:</Label>
        <FilterOptions
          name="developer"
          id="developer_select"
          onChange={e => {
            setDeveloper(e.target.value === 'All' ? null : e.target.value);
          }}
        >
          <option>All</option>
          {developers.map(developer => (
            <option key={developer.id} value={developer.slug}>
              {developer.name}
            </option>
          ))}
        </FilterOptions>
      </Filter>
    </Filters>
  );
};

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 5px;
`;

const FilterOptions = styled.select`
  width: 80px; 
  height: auto;
  padding: 5px;
  border-radius: 15px;
  font-family: inherit;
  color: darkblue;
  font-weight: 700;
  overflow: hidden;
`;
