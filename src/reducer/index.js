import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import moviesReducer from './moviesReducer';
import selectedMovieReducer from './selectedMovieReducer';
import apiReducer from './apiReducer';

export default combineReducers({
    moviesReducer,
    selectedMovieReducer,
    apiReducer,
    form: formReducer    
});


