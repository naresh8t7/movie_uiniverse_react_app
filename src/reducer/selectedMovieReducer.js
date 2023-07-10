import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';


const selectedMovieReducer = (state = initialState.selectedMovieReducer, action) => {
    switch(action.type) {

        case ActionType.GET_MOVIE_RESPONSE: {
            return {
                ...state,
                movie: _.assign(action.movie)
            };
        }


        default: { return state; }
    }
};


export default selectedMovieReducer;
