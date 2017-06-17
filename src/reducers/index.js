import { combineReducers } from 'redux';
import ImagesReducer from './images';
import SearchTextReducer from './searchtext';
const rootReducer = combineReducers({
  images: ImagesReducer,
  searchText: SearchTextReducer
});

export default rootReducer;
