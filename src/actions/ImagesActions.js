import uuid from 'js-uuid';
import { HISTORY_DATA, HISTORY_CLEAR, REQUEST_IMAGES_DATA_ERROR, REQUEST_IMAGES_DATA_RECEIVED, REQUEST_SET_TERM } from './ActionTypes';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const key = '9685535eedbb6ad9e9ff36630cd62098';
const flickerBase = `https://api.flickr.com/services/rest/?api_key=${key}&format=rest&format=json&nojsoncallback=1&method=flickr.photos.search&per_page=10&page=1`;
const pixabayKey = '5648887-ddc59b3aa5dda2aba059467bd';
const pixabayBase = `https://pixabay.com/api/?key=${pixabayKey}&image_type=photo&per_page=10&page=1&pretty=false`;


function logError(from, error) {
  return {
    type: REQUEST_IMAGES_DATA_ERROR,
    from,
    error
  };
}


function getFlickrPhotoUrl(image, i) {
  return {
    id: image.id + i,
    url: `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_s.jpg`,
    alt: image.alt
  };
}

function getDateTime() {
  const d = new Date();
  const dformat = `${d.getDate()}/${d.getMonth()}/${d.getFullYear().toString().substr(-2)} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  return dformat;
}

function logToHistory(searchTerm, serviceName, resultsCnt) {
  return {
    type: HISTORY_DATA,
    payload: {
      id: uuid.v4(),
      term: searchTerm,
      service: serviceName,
      time: getDateTime(),
      count: resultsCnt
    }
  };
}

function getPixabayPhotoUrl(image, i) {
  return {
    id: image.id + i,
    url: image.webformatURL,
    alt: image.tags
  };
}

function imagesDataReceived(data) {
  return {
    type: REQUEST_IMAGES_DATA_RECEIVED,
    data
  };
}

function fetchFlickerImages(dispatch, searchText) {
  return fetch(`${flickerBase}&text=${searchText}`).then((response) => {
    if (!response || !response.ok || response.status !== 200) {
      return dispatch(logError('FlickerAPI', `Bad response from server:${response.statusText}`));
    }
    return response.json();
  }).then((json) => {
    if (json.photos == null) {
      return dispatch(logError('FlickerAPI', 'Bad json'));
    }

    return json.photos.photo.map(getFlickrPhotoUrl);
  }).catch(error =>
    dispatch(logError('FlickerAPI', error.message))
  );
}

function fetchPixabayImages(dispatch, searchText) {
  return fetch(`${pixabayBase}&q=${searchText}`).then((response) => {
    if (!response || !response.ok || response.status !== 200) {
      return dispatch(logError('PixabayAPI', `Bad response from server:${response.statusText}`));
    }
    return response.json();
  }).then((json) => {
    if (json.hits == null) {
      return dispatch(logError('PixabayAPI', 'Bad json'));
    }
    return json.hits.map(getPixabayPhotoUrl);
  }).catch(error =>
    dispatch(logError('PixabayAPI', error.message))
  );
}

function performImageSearch(dispatch, searchText) {
  return fetchFlickerImages(dispatch, searchText).then((resFlicker) => {
    dispatch(logToHistory(searchText, 'Flicker', resFlicker.length));
    return resFlicker;
  }).then(results => fetchPixabayImages(dispatch, searchText).then((resPixabay) => {
    dispatch(logToHistory(searchText, 'Pixabay', resPixabay.length));
    results.push(...resPixabay);
    return dispatch(imagesDataReceived(results));
  }));
}

export function requestSetSearchText(searchText) {
  return {
    type: REQUEST_SET_TERM,
    payload: searchText
  };
}

export function clearHistory() {
  return {
    type: HISTORY_CLEAR,
    payload: []
  };
}

export function requestImages() {
  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.
  return function inner(dispatch, getState) {
    const searchText = getState().searchText.term;
    return performImageSearch(dispatch, searchText);
  };
}

export function requestImagesWithTerm(searchText) {
  return function inner(dispatch) {
    dispatch(requestSetSearchText(searchText));
    return performImageSearch(dispatch, searchText);
  };
}
