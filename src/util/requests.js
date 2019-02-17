import axios from 'axios';
import Web3 from 'web3';

export const BaseUrl = async () => {
  let network = 'none';
  try {
    const web3 = new Web3(Web3.givenProvider);
    network = await web3.eth.net.getId();
  } catch (err) {
    //switch this to mainnet when availible
    return process.env.REACT_APP_MAIN_API_HOST;
  }
  console.log(network);

  if (network === 1) {
    console.log('main');
    return process.env.REACT_APP_MAIN_API_HOST;
  } else if (network === 4) {
    console.log('rinkeby');
    return process.env.REACT_APP_API_HOST;
  }
};

export const get = async (endpoint) => {
  const baseURL = await BaseUrl();
  console.log(baseURL);

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
