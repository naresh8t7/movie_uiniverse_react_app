import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import MovieList from '../MovieList';


describe('MovieList.test.js', () => {

    it('renders without crashing', () => {
        const props = {
            movies: [
                { id: 1, title: 'movie1', price: '1' },
                { id: 2, title: 'movie2', price: '2' },                
            ],
            handleRowSelect: jest.fn()            
        };
        
        const wrapper = shallow(<MovieList {...props}/>);

        expect(wrapper).toHaveLength(1);
        expect(wrapper.find('BootstrapTable')).toHaveLength(1);

        
    });
});
