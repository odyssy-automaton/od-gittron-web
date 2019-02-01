import axios from 'axios';

const baseURL = process.env.REACT_APP_API_HOST;

export const instance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export const get = async (endpoint) => {
  console.log(baseURL);
  try {
    return await instance.get(`/${endpoint}`);
  } catch (err) {
    throw new Error(err);
  }
};

export const post = async (endpoint, payload) => {
  try {
    return await instance.post(`/${endpoint}`, payload);
  } catch (err) {
    throw new Error(err);
  }
};

export const put = async (endpoint, payload) => {
  try {
    return await instance.put(`/${endpoint}`, payload);
  } catch (err) {
    throw new Error(err);
  }
};

export const patch = async (endpoint, payload) => {
  try {
    return await instance.patch(`/${endpoint}`, payload);
  } catch (err) {
    throw new Error(err);
  }
};
