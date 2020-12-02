import Axios from 'axios';
import constants from './constants';

const configAxios = () => {
  Axios.defaults.baseURL = constants.BASE_API_URL;
  const token = localStorage.getItem('token');
  if (token) {
    Axios.defaults.headers.common.Authorization = token;
  }
};

const init = () => {
  configAxios();
};

init();
