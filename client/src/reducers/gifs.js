import { LOADING, GET_GIFS, GET_EXTRA_GIFS } from '../actions/types';

const gifsReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return state;
    case GET_GIFS:
      return action.payload;
    case GET_EXTRA_GIFS:
      return state.concat(action.payload);
    default:
      return state;
  }
};

export default gifsReducer;
