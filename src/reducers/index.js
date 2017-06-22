import { combineReducers } from 'redux';
import ImagesReducer from './images';
import SearchTextReducer from './searchtext';
import ModalReducer from './modal';
import DataErrorReducer from './dataerror';
import HistoryReducer from './history';

const rootReducer = combineReducers({
  modal: ModalReducer,
  images: ImagesReducer,
  history: HistoryReducer,
  searchText: SearchTextReducer,
  dataError: DataErrorReducer
});

export default rootReducer;
