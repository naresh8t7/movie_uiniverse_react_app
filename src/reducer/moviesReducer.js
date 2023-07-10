import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';



const moviesReducer = (state = initialState.moviesReducer, action) => {
    switch(action.type) {
        case ActionType.GET_MOVIES_RESPONSE: {
            // '...' spread operator clones the state
            // lodash Object assign simply clones action.movies into a new array.
            // The return object is a copy of state and overwrites the state.movies with a fresh clone of action.movies
            return {
                ...state, 
                movies: _.assign(action.movies)
            };
        }


        default: { return state; }
    }
};



export default moviesReducer;
