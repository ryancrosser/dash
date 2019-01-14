import * as CONSTANTS from './constants';

export default {
  [CONSTANTS.SET_DATA](state, payload) {
    state.data = payload;
  }
};
