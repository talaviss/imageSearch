import * as commandActions from './CommandActions';

export  function requestImages(searchText = null) {
  console.log('the search text in action creator' + searchText);
  return {
    type: commandActions.REQUEST_IMAGES,
    payload: searchText
  }
}
