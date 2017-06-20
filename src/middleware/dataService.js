import request from 'superagent';
import {REQUEST_IMAGES, REQUEST_IMAGES_DATA_ERROR, REQUEST_IMAGES_DATA_RECEIVED }  from '../actions/ActionTypes';

const key = '9685535eedbb6ad9e9ff36630cd62098';
const flicker_base = `https://api.flickr.com/services/rest/?api_key=${key}&format=rest&format=json&nojsoncallback=1`;
const pixabay_key = '5648887-ddc59b3aa5dda2aba059467bd';
const pixabay_base = `https://pixabay.com/api/?key=${pixabay_key}&image_type=photo&per_page=10&page=1&pretty=false`;

function getFlickrPhotoUrl(image, i) {
    return {
        id: image.id,
        url: `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_s.jpg`,
        alt: image.alt
    }
}

function getPixabayPhotoUrl(image,i) {
    return {
        id: image.webformatURL,
        url: image.webformatURL,
        alt: image.tags
    }
}

function dispatchHistory(store, searchTerm, serviceName, resultsCnt){
  store.dispatch({
    type: 'HISTORY_DATA',
    payload: {
      searchTerm,
      serviceName: serviceName,
      timeOfSearch: new Date().toUTCString(),
      resultsCount: resultsCnt
    }});
}

/*
 data service middleware responsible for fetching the images
*/
const dataService = store => next => action => {
  /*
  Pass all actions through by default
  */
  next(action)
  switch (action.type) {
  case REQUEST_IMAGES:
    /*
    In case we receive an action to send an API request, send the appropriate request
    */
    const searchTerm = action.payload;
    request.get(`${flicker_base}&method=flickr.photos.search&text=${action.payload}&per_page=10&page=1`)
      .end((err, res) => {
        if (err) {
          return next({
            type: REQUEST_IMAGES_DATA_ERROR,
            err
          })
        }

        let data = [];
        if (res && res.status === 200 && res.body.photos) {
            data.push(...res.body.photos.photo.map(getFlickrPhotoUrl));
            dispatchHistory(store, searchTerm, 'Flicker', data.length);

            //console.dir(dataFlicker);
            request.get(`${pixabay_base}&q=${action.payload}`)
            .end((err, res) => {
              if (err) {
                return next({
                  type: REQUEST_IMAGES_DATA_ERROR,
                  err
                })
              }
              if (res && res.status === 200 && res.text) {
                  const dataFromPixaboy = res.body.hits.map(getPixabayPhotoUrl);
                  console.dir(dataFromPixaboy);
                  data.push(...dataFromPixaboy);
                  dispatchHistory(store, searchTerm, 'Pixaboy', dataFromPixaboy.length);
                  next({
                    type: REQUEST_IMAGES_DATA_RECEIVED,
                    data
                  })
              }
            });
        }
        else {
          console.error('received bad status from flicker api' + res.status, err);
        }

        /*
        Once data is received, dispatch an action telling the application
        that data was received successfully, along with the parsed data
        */

      })
    break
  /*
  Do nothing if the action does not interest us
  */
  default:
    break
  }
};

export default dataService
