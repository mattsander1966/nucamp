import * as ActionTypes from './ActionTypes';
import { CAMPSITES } from "../shared/campsites";
import { baseUrl } from '../shared/baseUrl';

export const fetchCampsites = () => dispatch => {
  dispatch(campsitesLoading());

  return fetch(baseUrl + 'campsites')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(`Error ${response.status}: ${response.statusText}`); error.response = response;
        throw error;
      }
    },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(campsites => dispatch(addCampsites(campsites)))
    .catch(error => dispatch(campsitesFailed(error.message)));
};

export const fetchComments = () => dispatch => {
  return fetch(baseUrl + 'comments')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(`Error ${response.status}: ${response.statusText}`); error.response = response;
        throw error;
      }
    },
      error => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const fetchPromotions = () => (dispatch) => {

  dispatch(promotionsLoading());

  return fetch(baseUrl + 'promotions')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(promotions => dispatch(addPromotions(promotions)))
    .catch(error => dispatch(promotionsFailed(error.message)));
};