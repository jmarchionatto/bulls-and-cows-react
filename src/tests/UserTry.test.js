import React from 'react';
import { shallow } from 'enzyme';
import Atry from '../Atry';
import UserTry from '../UserTry';

describe('Atry', () => {
    it('generated Atry is vals read-write', () => {
        let wrapper = shallow(<UserTry />);

        expect(wrapper.containsMatchingElement(<Atry valsReadOnly={false} />)).toBe(true);
    });
});
