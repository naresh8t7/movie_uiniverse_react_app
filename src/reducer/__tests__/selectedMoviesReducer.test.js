import selectedMovieReducer from '../selectedMovieReducer';
import * as MovieAction from '../../action/MovieAction';
import * as ActionType from '../../action/ActionType';



describe('selectedMovieReducer.test.js', ()  => {

    it('has a default state', () => {
        const initialState = undefined;
        const action = { type: 'blah blah' }

        const newState = selectedMovieReducer(initialState, action);

        const expectedState = { movie: undefined };

        expect(newState).toEqual(expectedState);
    });


    it(`should get a particular movie when passed ${ActionType.GET_MOVIE_RESPONSE}`, () => {
        const initialState = {
            movie: undefined
        };

        const movie = {title: 'B'};

        const action = MovieAction.getMovieResponse(movie);

        const newState = selectedMovieReducer(initialState, action);

        expect(newState.movie).toEqual(movie);
    });

});
