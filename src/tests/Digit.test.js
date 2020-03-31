import React from 'react';
import { shallow } from 'enzyme';
import Digit from '../Digit';

describe('Digit', () => {
    it('sets received value', () => {
        let value = 1;
        let wrapper = shallow(<Digit value={value} />);
        expect(wrapper.prop('value')).toBe(value);
    });

    it('sets received readonly', () => {
        let readOnly = true;
        let wrapper = shallow(<Digit readOnly={readOnly} />);
        expect(wrapper.prop('readonly')).toBe(true);
    });

    it('sets received first', () => {
        let first = true;
        let wrapper = shallow(<Digit first={first} />);
        expect(wrapper.prop('first')).toBe(first);
    });

    it('digit value validation right regex', () => {
        const valueDigit = RegExp('^(?:\\d{1}|)$');

        expect(valueDigit.test('')).toBe(true);
        expect(valueDigit.test('1')).toBe(true);
        expect(valueDigit.test(1)).toBe(true);
        expect(valueDigit.test(11)).toBe(false);
        expect(valueDigit.test('11')).toBe(false);
    });

    it('digit resp validation right regex', () => {
        const valueDigit = RegExp('^(?:[0-3]{1}|)$');

        expect(valueDigit.test('')).toBe(true);

        expect(valueDigit.test('0')).toBe(true);
        expect(valueDigit.test(0)).toBe(true);

        expect(valueDigit.test('1')).toBe(true);
        expect(valueDigit.test(1)).toBe(true);

        expect(valueDigit.test('2')).toBe(true);
        expect(valueDigit.test(2)).toBe(true);

        expect(valueDigit.test('3')).toBe(true);
        expect(valueDigit.test(3)).toBe(true);

        expect(valueDigit.test(11)).toBe(false);
        expect(valueDigit.test('11')).toBe(false);

        expect(valueDigit.test(4)).toBe(false);
        expect(valueDigit.test('4')).toBe(false);
    });
});
