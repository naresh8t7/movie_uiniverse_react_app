import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import createMemoryHistory from 'history/createMemoryHistory';
import { MovieListContainer } from '../MovieListContainer';


describe('MovieListContainer.test.js', () => {

    it('renders without crashing', () => {
        const props = {
            movies: [
                { title: 'movie' }
            ],
            action: { getMoviesAction: jest.fn().mockReturnValue(Promise.resolve('')) },
            history: createMemoryHistory()
        };

        const wrapper = shallow(<MovieListContainer {...props} />);

        expect(wrapper).toHaveLength(1);

        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();

        expect(wrapper.find('button')).toHaveLength(3);
    });

  
});

