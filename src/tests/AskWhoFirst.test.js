import React from 'react';
import { shallow } from 'enzyme';
import AskWhoFirst from '../AskWhoFirst';

describe('AskWhoFirst', () => {
    it('UserBtn passed callback with right boolean', () => {
        let cb = jest.fn();
        const wrapper = shallow(<AskWhoFirst onSetWhoFirst={cb} />);
        wrapper.find('AskWhoFirst__UserBtn').simulate('click');
        expect(cb.mock.calls[0][0]).toBe(true);
    });

    it('CompBtn passed callback with right boolean', () => {
        let cb1 = jest.fn();
        const wrapper = shallow(<AskWhoFirst onSetWhoFirst={cb1} />);
        wrapper.find('AskWhoFirst__CompBtn').simulate('click');
        expect(cb1.mock.calls[0][0]).toBe(false);
    });
});
