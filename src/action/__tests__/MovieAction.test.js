import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as MovieActions from '../MovieAction';
import * as ActionType from '../ActionType';



describe('MovieAction.test.js', () => {

    describe('getMoviesResponseAction Creator', () => {
        it(`should create action ${ActionType.GET_MOVIES_RESPONSE}`, () => {
            const movies = [{ title: 'Test Movie' }];
            const expectedAction = {
                type: ActionType.GET_MOVIES_RESPONSE,
                movies: movies
            };

            const actualAction = MovieActions.getMoviesResponse(movies);

            expect(actualAction).toEqual(expectedAction);
        });
    });


    describe('addNewMovieResponseAction Creator', () => {
        it(`should create action ${ActionType.ADD_NEW_MOVIE_RESPONSE}`, () => {
            const movie = { title: 'Test Movie' };
            const expectedAction = {
                type: ActionType.ADD_NEW_MOVIE_RESPONSE
            };

            const actualAction = MovieActions.addNewMovieResponse(movie);

            expect(actualAction).toEqual(expectedAction);
        });
    });


    describe('getMovieResponseAction Creator', () => {
        it(`should create action ${ActionType.GET_MOVIE_RESPONSE}`, () => {
            const movie = { title: 'Test Movie' };
            const expectedAction = {
                type: ActionType.GET_MOVIE_RESPONSE,
                movie: movie
            };

            const actualAction = MovieActions.getMovieResponse(movie);

            expect(actualAction).toEqual(expectedAction);
        });
    });
});


