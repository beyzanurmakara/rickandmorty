import axios from 'axios';

const BASE_URL = 'rickandmortyapi.com';

const getList = async () => {
  await axios.get(BASE_URL + '/api/episode')
    .then(result => {
      return result.data;
    })
    .catch(e => {
      throw e;
    });
};

export default {
  getList,
};
