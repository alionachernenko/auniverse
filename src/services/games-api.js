import axios from 'axios';

//e4eb20c9305d4fc2a030e3d7f630291a

const base_params = {
  BASE_URL: 'https://api.rawg.io/api/',
  KEY: 'a213aea710e046b99316e810f548e9d6',
};

export const getGames = async page => {
  const { BASE_URL, KEY } = base_params;

  const data = await axios.get(`${BASE_URL}games?key=${KEY}&page=${page}`);
  return data;
};

export const getNewGames = async page => {
  const { BASE_URL, KEY } = base_params;

  const data = await axios.get(
    `${BASE_URL}games?key=${KEY}&page=${page}&dates=2023-01-01,2023-01-31`
  );
  return data;
};

export const getGameBySearchQuery = async (
  searchQuery,
  page,
  ordering,
  genres,
  platforms
) => {
  const { BASE_URL, KEY } = base_params;
  const data = await axios.get(
    `${BASE_URL}games?key=${KEY}&page=${page}&search=${searchQuery}&ordering=-${ordering}&genres=${genres}`
  );
  return data;
};

export const getGameById = async id => {
  const { BASE_URL, KEY } = base_params;

  const data = await axios.get(`${BASE_URL}games/${id}?key=${KEY}`);
  return data;
};

export const getScreenshotsOfGame = async id => {
  const { BASE_URL, KEY } = base_params;

  const data = await axios.get(`${BASE_URL}games/${id}/screenshots?key=${KEY}`);
  return data;
};

export const getStores = async id => {
  const { BASE_URL, KEY } = base_params;

  const data = await axios.get(`${BASE_URL}games/${id}/stores?key=${KEY}`);
  return data;
};
