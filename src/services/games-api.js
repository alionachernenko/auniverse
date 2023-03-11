import axios from 'axios';

const base_params = {
  BASE_URL: 'https://api.rawg.io/api/',
  KEY: 'a213aea710e046b99316e810f548e9d6',
};

export const getGames = async page => {
  const { BASE_URL, KEY } = base_params;

  const data = await axios.get(`${BASE_URL}games?key=${KEY}&page=${page}`);
  return data;
};

export const getGameByName = async name => {
  const { BASE_URL, KEY } = base_params;

  const data = await axios.get(
    `${BASE_URL}games?key=${KEY}&page=${1}&search=${name}`
  );
  return data;
};

export const getNewGames = async page => {
  const { BASE_URL, KEY } = base_params;
  const currentDate = new Date()

  const data = await axios.get(
    `${BASE_URL}games?key=${KEY}&page=${page}&dates=2023-01-01,${currentDate.toISOString().slice(0, 10)}`
  );
  return data;
};

export const getGameBySearchQuery = async (
  searchQuery,
  page,
  ordering,
  genres
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
