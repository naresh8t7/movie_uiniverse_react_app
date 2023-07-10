import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {AddOrEditMovieContainer} from '../AddOrEditMovieContainer';


describe('AddOrEditMovieContainer.test.js', () => {

    it('renders without crashing', () => {
        const props = {
            action: {
                getMovieAction: jest.fn().mockReturnValue(Promise.resolve(''))
            },
            initialValues: {id: '', title: ''},
            match: {params: {id:'1'}}
        };

        const wrapper = shallow(<AddOrEditMovieContainer {...props}/>);
        expect(wrapper.length).toEqual(1);

        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

});



    
