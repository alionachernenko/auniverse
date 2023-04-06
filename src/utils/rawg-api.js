import axios from 'axios';
import baseParams from 'config/rawg-api';

const { KEY, BASE_URL } = baseParams;

export const fetchGames = async page => {
  const data = await axios.get(`${BASE_URL}games?key=${KEY}&page=${page}`);
  return data;
};

export const fetchGameByName = async name => {
  const data = await axios.get(
    `${BASE_URL}games?key=${KEY}&page=${1}&search=${name}`
  );
  return data;
};

export const fetchNewGames = async (page, pageSize) => {
  const currentDate = new Date();

  const data = await axios.get(
    `${BASE_URL}games?key=${KEY}&page=${page}&page_size=${pageSize}&dates=2023-01-01,${currentDate
      .toISOString()
      .slice(0, 10)}`
  );
  return data;
};

export const fetchGameBySearchQuery = async (
  searchQuery,
  page,
  ordering,
  genres
) => {
  const params = {
    ordering: ordering !== null ? `-${ordering}` : ordering,
    genres,
    page,
    key: KEY,
    search: searchQuery,
  };

  return await axios.get(`${BASE_URL}games`, { params });
};

export const fetchGameById = async id => {
  const data = await axios.get(`${BASE_URL}games/${id}?key=${KEY}`);
  return data;
};

export const fetchScreenshots = async id => {
  const data = await axios.get(`${BASE_URL}games/${id}/screenshots?key=${KEY}`);
  return data;
};

export const fetchStores = async id => {
  const data = await axios.get(`${BASE_URL}games/${id}/stores?key=${KEY}`);
  return data;
};
