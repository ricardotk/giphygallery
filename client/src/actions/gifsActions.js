import axios from 'axios';

import { LOADING, GET_GIFS, GET_EXTRA_GIFS } from './types';

let onLoad = false;

export const getGifs = (query, dispatch) => {
  if (onLoad) return;
  dispatch(setLoading());
  axios
    .get(`/api/gifs?q=${query}`)
    .then(res => {
      onLoad = false;
      dispatch({
        type: GET_GIFS,
        payload: res.data
      });
    })
    .catch(err => {
      onLoad = false;
      dispatch({
        type: GET_GIFS,
        payload: null
      });
    });
};

export const getExtraGifs = (query, offset, dispatch) => {
  if (onLoad) return;
  dispatch(setLoading());
  axios
    .get(`/api/gifs?q=${query}&offset=${offset}`)
    .then(res => {
      onLoad = false;
      dispatch({
        type: GET_EXTRA_GIFS,
        payload: res.data
      });
    })
    .catch(err => {
      onLoad = false;
      dispatch({
        type: GET_EXTRA_GIFS,
        payload: null
      });
    });
};

// Set loading state
export const setLoading = () => {
  onLoad = true;
  return {
    type: LOADING
  };
};
