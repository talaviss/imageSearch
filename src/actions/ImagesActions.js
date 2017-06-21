import {/*REQUEST_IMAGES,*/ REQUEST_IMAGES_DATA_ERROR, REQUEST_IMAGES_DATA_RECEIVED, REQUEST_SET_TERM}  from './ActionTypes';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const key = '9685535eedbb6ad9e9ff36630cd62098';
const flicker_base = `https://api.flickr.com/services/rest/?api_key=${key}&format=rest&format=json&nojsoncallback=1&method=flickr.photos.search&per_page=10&page=1`;
const pixabay_key = '5648887-ddc59b3aa5dda2aba059467bd';
const pixabay_base = `https://pixabay.com/api/?key=${pixabay_key}&image_type=photo&per_page=10&page=1&pretty=false`;


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
    }
}

function logToHistory(searchTerm, serviceName, resultsCnt) {
  return {
    type: 'HISTORY_DATA',
    payload: {
      searchTerm,
      serviceName: serviceName,
      timeOfSearch: new Date().toUTCString(),
      resultsCount: resultsCnt
    }
  };
}

function getPixabayPhotoUrl(image, i) {
    return {
        id: image.id + i,
        url: image.webformatURL,
        alt: image.tags
    }
}

function imagesDataReceived(data){
    console.log('imagesDataReceived');
    console.dir(data);
  return {
    type: REQUEST_IMAGES_DATA_RECEIVED,
    data
  }
}

function fetchFlickerImages(dispatch, searchText) {
    return fetch(`${flicker_base}&text=${searchText}`).then((response) => {
        if (!response || !response.ok || response.status !== 200) {//||
            return dispatch(logError('FlickerAPI', `Bad response from server:${response.statusText}`));
        }
        return response.json();
    }).then(function(json) {

        if(json.photos==null){
            return dispatch(logError('PixabayAPI', `Bad json`));
        }
        console.log(json.photos);
        return json.photos.photo.map(getFlickrPhotoUrl);
    });
}

function fetchPixabayImages(dispatch, searchText) {
  return fetch(`${pixabay_base}&q=${searchText}`).then((response) => {
      if (!response || !response.ok || response.status !== 200) {//||
          return dispatch(logError('PixabayAPI', `Bad response from server:${response.statusText}`));
      }
      return response.json();
  }).then(function(json) {
      if(json.hits==null){
          return dispatch(logError('PixabayAPI', `Bad json`));
      }
      console.log(json.hits);
      return json.hits.map(getPixabayPhotoUrl);
  });
}


export function requestSetSearchText(searchText) {
  console.log(searchText);
  return {
    type: REQUEST_SET_TERM,
    payload: searchText
  }
}

export function requestImages() {
    //console.log('get pictures');
    // Invert control!
    // Return a function that accepts `dispatch` so we can dispatch later.
    // Thunk middleware knows how to turn thunk async actions into actions.
    return function (dispatch, getState) {
        const searchText = getState().searchText.term;

        return fetchFlickerImages(dispatch, searchText).then(resFlicker => {
            dispatch(logToHistory(searchText, 'Flicker', resFlicker.length));
            return resFlicker;
        }).then((results) => {
            return fetchPixabayImages(dispatch, searchText).then(resPixabay => {
            dispatch(logToHistory(searchText, 'Pixabay', resPixabay.length));
                results.push(...resPixabay);
                return dispatch(imagesDataReceived(results));
            }).catch((error) => {
                dispatch(logError('general', error));
                //return results;
            })
        })
    }
}
