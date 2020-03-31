import React from 'react';
import { shallow } from 'enzyme';
import DigitsLine from '../DigitsLine';
import UserDigitsLine from '../UserDigitsLine';

describe('DigitsLine', () => {
    it('generated DigitsLine is vals read-write', () => {
        let wrapper = shallow(<UserDigitsLine />);

        expect(wrapper.containsMatchingElement(<DigitsLine valsReadOnly={false} />)).toBe(true);
    });
});
