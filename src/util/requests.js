import axios from 'axios';
import Web3 from 'web3';

export const BaseUrl = async () => {
  const web3 = new Web3(Web3.givenProvider);
  if (!web3) {
    console.log('none');
    return process.env.REACT_APP_MAIN_API_HOST;
  }
  const network = await web3.eth.net.getId();
  console.log('network', network);

  if (network === 1) {
    console.log('main');
    return process.env.REACT_APP_MAIN_API_HOST;
  } else {
    console.log('rinkeby');
    return process.env.REACT_APP_API_HOST;
  }
};

export const get = async (endpoint) => {
  const baseURL = await BaseUrl();

  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    return await instance.get(`/${endpoint}`);
  } catch (err) {
    throw new Error(err);
  }
};

export const post = async (endpoint, payload) => {
  const baseURL = await BaseUrl();

  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    return await instance.post(`/${endpoint}`, payload);
  } catch (err) {
    return err.response;
  }
};

export const put = async (endpoint, payload) => {
  const baseURL = await BaseUrl();

  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    return await instance.put(`/${endpoint}`, payload);
  } catch (err) {
    throw new Error(err);
  }
};

export const patch = async (endpoint, payload) => {
  const baseURL = await BaseUrl();
  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    return await instance.patch(`/${endpoint}`, payload);
  } catch (err) {
    throw new Error(err);
  }
};
