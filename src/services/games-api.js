import axios from 'axios';
import baseParams from 'config/rawg-api';

const {KEY, BASE_URL} = baseParams

export const getGames = async page => {
  const data = await axios.get(`${BASE_URL}games?key=${KEY}&page=${page}`);
  return data;
};

export const getGameByName = async name => {
  const data = await axios.get(
    `${BASE_URL}games?key=${KEY}&page=${1}&search=${name}`
  );
  return data;
};

export const getNewGames = async page => {
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

const filters = {
  ordering,
  genres
};

const queryString = Object.entries(filters)
  .filter(([key, value]) => value !== '')
  .map(([key, value]) => `${key}=${value}`)
  .join('&');

  console.log(queryString)

return await axios.get(
      `${BASE_URL}games?key=${KEY}&page=${page}&search=${searchQuery}&${queryString}`)
  }

export const getGameById = async id => {
  const data = await axios.get(`${BASE_URL}games/${id}?key=${KEY}`);
  return data;
};

export const getScreenshotsOfGame = async id => {
  const data = await axios.get(`${BASE_URL}games/${id}/screenshots?key=${KEY}`);
  return data;
};

export const getStores = async id => {
  const data = await axios.get(`${BASE_URL}games/${id}/stores?key=${KEY}`);
  return data;
};
