import React from 'react';
import { shallow } from 'enzyme';
import DigitsLine from '../DigitsLine';
import CompDigitsLine from '../CompDigitsLine';

describe('DigitsLine', () => {
    it('generated DigitsLine is vals read-only', () => {
        let wrapper = shallow(<CompDigitsLine />);

        expect(wrapper.containsMatchingElement(<DigitsLine valsReadOnly={true} />)).toBe(true);
    });
});
