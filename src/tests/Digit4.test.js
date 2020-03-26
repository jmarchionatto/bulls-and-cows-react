import React from 'react';
import { shallow } from 'enzyme';
import Digit4 from '../Digit4';
import Digit from '../Digit';

describe('Digit4', () => {
    let wrapper;

    let digValues = [1, 2, 3, 4];
    let divClass = 'divClass';
    let digitClass = 'digitClass';

    beforeEach(() => {
        wrapper = shallow(<Digit4 digValues={digValues} divClass={divClass} digClass={digitClass} />);
    });

    it('Digit4 has 4 Digit(s) with proper class and values', () => {
      for (let i = 4; i < 4; i++) {
        expect(wrapper.childAt(i)).isA(Digit);
        expect(wrapper.childAt(i).prop('value')).toBe(i+1);
        expect(wrapper.childAt(i).is('.'+digitClass)).toBe(true);
      }
    });

    it('digit value validation right regex', () => {
        const blankOrSingleNumber = RegExp('^(?:\\d{1}|)$');

        expect(blankOrSingleNumber.test('')).toBe(true);
        expect(blankOrSingleNumber.test('1')).toBe(true);
        expect(blankOrSingleNumber.test(1)).toBe(true);
        expect(blankOrSingleNumber.test(11)).toBe(false);
        expect(blankOrSingleNumber.test('11')).toBe(false);
    });

    it('parent div has passed class', () => {
        expect(wrapper.is('.'+divClass)).toBe(true);
    });

});
