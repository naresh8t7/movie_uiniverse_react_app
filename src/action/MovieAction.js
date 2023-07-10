import * as ActionType from './ActionType';
import MovieApi from '../api/MovieApi';
import { ApiCallBeginAction, ApiCallErrorAction } from './ApiAction';



export const getMoviesResponse = movies => ({
    type: ActionType.GET_MOVIES_RESPONSE,
    movies
});



export function getMoviesAction() {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return MovieApi.getAllMovies()
            .then(movies => {
                dispatch(getMoviesResponse(movies.movies));
            }).catch(error => {
                throw error;
            });
    };
}



export const addNewMovieResponse = () => ({
    type: ActionType.ADD_NEW_MOVIE_RESPONSE
});



export const updateExistingMovieResponse = () => ({
    type: ActionType.UPDATE_EXISTING_MOVIE_RESPONSE
});



export function saveMovieAction(movieBeingAddedOrEdited) {
    return function (dispatch) {

        dispatch(ApiCallBeginAction());

        //if title exists, it means that the movie is being edited, therefore update it.
        //if title doesn't exist, it must therefore be new movie that is being added, therefore add it
        return MovieApi.saveMovie({movie: movieBeingAddedOrEdited})
            .then(() => {
                if (movieBeingAddedOrEdited.title) {
                    dispatch(updateExistingMovieResponse());
                } else {
                    dispatch(addNewMovieResponse());
                }
            }).then(() => {
                dispatch(getMoviesAction());
            }).catch(error => {
                dispatch(ApiCallErrorAction());
                throw (error);
            });
    };
}



export const getMovieResponse = movieFound => ({
    type: ActionType.GET_MOVIE_RESPONSE,
    movie: movieFound
});



export function getMovieAction(movieId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return MovieApi.getMovie(movieId)
            .then(movie => {
                dispatch(getMovieResponse(movie.movie));
            }).catch(error => {
                throw error;
            });
    };
}



export const deleteMovieResponse = () => ({
    type: ActionType.DELETE_MOVIE_RESPONSE
});



export function deleteMovieAction(movieId) {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());

        return MovieApi.deleteMovie(movieId)
            .then(() => {
                dispatch(deleteMovieResponse());
            }).then(() => {
                dispatch(getMoviesAction());
            }).catch(error => {
                throw error;
            });
    };
}
