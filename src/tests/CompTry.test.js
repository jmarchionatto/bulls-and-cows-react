import React from 'react';
import { shallow } from 'enzyme';
import Atry from '../Atry';
import CompTry from '../CompTry';

describe('Atry', () => {
    it('generated Atry is vals read-only', () => {
        let wrapper = shallow(<CompTry />);

        expect(wrapper.containsMatchingElement(<Atry valsReadOnly={true} />)).toBe(true);
    });
});
