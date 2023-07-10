import moviesReducer from '../moviesReducer';
import * as MovieAction from '../../action/MovieAction';
import * as ActionType from '../../action/ActionType';



describe('moviesReducer.test.js', ()  => {

    it('has a default state', () => {
        const initialState = undefined;
        const action = { type: 'blah blah' };

        const newState = moviesReducer(initialState, action);

        const expectedState = { movies: [] };

        expect(newState).toEqual(expectedState);
    });



    it(`should get all movies when passed ${ActionType.GET_MOVIES_RESPONSE}`, () => {
        const initialState = {
            movies: []
        };

        const movies = [{id: 1, title: 'A'}, {id: 2, title: 'B'}];

        const action = MovieAction.getMoviesResponse(movies);

        const newState = moviesReducer(initialState, action);

        expect(newState.movies.length).toEqual(2);
        expect(newState.movies[0].id).toEqual(1);
    });    


});
