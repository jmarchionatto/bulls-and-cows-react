import React from 'react';
import { shallow } from 'enzyme';
import Digit4 from '../Digit4';
import Digit from '../Digit';

describe('Digit4', () => {
    let wrapper;

    let digitVals = [4, 5, 6, 7];

    beforeEach(() => {
        wrapper = shallow(
            <Digit4
                digitVals={digitVals}
                readOnly={true}
                onDigitCh={jest.fn()}
                refs={[jest.fn()]}
            />
        );
    });

    // it('has 4 Digit(s) with passed values and readonly values', () => {
    //     for (let i = 0; i < 4; i++) {
    //         expect(wrapper.childAt(i).type()).toBe(Digit);
    //         // expect(wrapper.childAt(i).prop('value')).toBe(i);
    //         expect(wrapper.childAt(i)).toHaveProperty('readonly', true);
    //     }
    // });

    it('only first child Digit is first=true', () => {
        console.log('wrapper: ', wrapper.debug());

        // expect(wrapper.childAt(0)).toHaveProperty('first');

        // expect(wrapper.find("Digit[first]").toBe(true);

        // expect(rendered.props()).to.have.property('maxLength', '10');
        // expect(wrapper.childAt(1)).toNotHaveProperty('first');
        // for (let i = 0; i < 4; i++) {
        // }
    });
});
