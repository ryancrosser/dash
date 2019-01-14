import axios from 'axios';

import * as CONSTANTS from './constants';

export default {
  [CONSTANTS.GET_DATA]({ commit }) {
    axios
      .get(CONSTANTS.DATA_URL)
      .then(response => {
        commit(CONSTANTS.SET_DATA, response.data);
      })
      .catch(err => {
        console.log(err);
        commit(CONSTANTS.SET_DATA, '');
      });
  }
};
