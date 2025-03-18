import { legacy_createStore as createStore } from 'redux';
import fitnessReducer from './Reducers';
const store=createStore(fitnessReducer);
export default store;