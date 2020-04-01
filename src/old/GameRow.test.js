import React from 'react';
import { shallow } from 'enzyme';
import GameRow from '../GameRow';

describe('GameRow', () => {
    let wrapper;

    const aRow = {
        userTry: {
            digitVals: [3, 2, 1, 0],
            rg: 2,
            rr: 1,
            valsRO: true,
            rateRO: true,
            showSendTry: true,
            showSendRate: true,
        },
        compTry: {
            digitVals: [6, 5, 4, 3],
            rg: 0,
            rr: 2,
            valsRO: true,
            rateRO: true,
            showSendTry: true,
            showSendRate: true,
        },
    };

    beforeEach(() => {
        wrapper = shallow(<GameRow aRow={aRow} />);
    });

    it('renders OK', () => {
        // expect(wrapper.childAt(0)).toHaveProperty('first');
        console.log('wrapper: ', wrapper.debug());
    });
});
