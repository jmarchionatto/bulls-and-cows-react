import React from 'react';
import { shallow } from 'enzyme';
import TriesColumn from '../TriesColumn';
import Digit from '../Digit';

describe('TriesColumn', () => {
    let tries = [
        {
            digitVals: [0, 1, 2, 3],
            rg: 0,
            rr: 1,
            showSendTry: false,
            showRate: false,
            valsRO: true,
            rateRO: true,
        },
        {
            digitVals: [4, 5, 6, 7],
            rg: 0,
            rr: 2,
            showSendTry: false,
            showRate: false,
            valsRO: true,
            rateRO: true,
        },
        {
            digitVals: [null, null, null, null],
            rg: null,
            rr: null,
            showSendTry: false,
            showRate: false,
            valsRO: false,
            rateRO: true,
        },
    ];

    it('renders', () => {
        let wrapper = shallow(<TriesColumn tries={tries} />);
        expect(wrapper.exists()).toBe(true);
        console.log('wrapper: ', wrapper.debug());
    });

    // it('sets received value', () => {
    //     let value = 1;
    //     let wrapper = shallow(<Digit value={value} />);
    //     expect(wrapper.prop('value')).toBe(value);
    // });

    // it('sets received readonly', () => {
    //     let readOnly = true;
    //     let wrapper = shallow(<Digit readOnly={readOnly} />);
    //     expect(wrapper.prop('readonly')).toBe(true);
    // });

    // it('sets received first', () => {
    //     let first = true;
    //     let wrapper = shallow(<Digit first={first} />);
    //     expect(wrapper.prop('first')).toBe(first);
    // });
});
