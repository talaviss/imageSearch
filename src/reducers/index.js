import { combineReducers } from 'redux';
import ImagesReducer from './images';
import SearchTextReducer from './searchtext';
import ModalReducer from './modal';

const rootReducer = combineReducers({
  modal: ModalReducer,
  images: ImagesReducer,
  searchText: SearchTextReducer
});

export default rootReducer;
