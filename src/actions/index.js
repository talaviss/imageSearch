import {REQUEST_IMAGES, REQUEST_SET_TERM}  from './ActionTypes';

function requestImagesWithTerm(searchText){
  console.log('the search text in action creator' + searchText);
  return {
    type: REQUEST_IMAGES,
    payload: searchText
  }
}

export function requestImages() {
  return (dispatch, getState) => {

    var searchText = getState().searchText.term;
    dispatch(requestImagesWithTerm(searchText));
  };
}

export function requestSetSearchText(searchText) {
  console.log(searchText);
  return {
    type: REQUEST_SET_TERM,
    payload: searchText
  }
}
