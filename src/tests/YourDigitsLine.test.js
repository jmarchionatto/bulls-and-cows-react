import React from 'react';
import { shallow } from 'enzyme';
import DigitsLine from '../DigitsLine';
import YourDigitsLine from '../YourDigitsLine';

describe('DigitsLine', () => {
    it('generated DigitsLine is vals read-write', () => {
        let wrapper = shallow(<YourDigitsLine />);

        expect(wrapper.containsMatchingElement(<DigitsLine valsReadOnly={false} />)).toBe(true);
    });
});
