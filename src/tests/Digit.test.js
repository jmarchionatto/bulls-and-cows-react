import React from 'react';
import { shallow } from 'enzyme';
import Digit from '../Digit';

describe('Digit', () => {
    it('check Digit has passed value', () => {
        let value = 1;
        let wrapper = shallow(<Digit value={value} />);
        expect(wrapper.prop('value')).toBe(value);
    });
});
