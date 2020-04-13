import React from 'react';
import { shallow } from 'enzyme';
import Atry from '../Atry';

describe('Atry', () => {
    let wrapper;

    beforeEach(() => {
        let digitVals = [1, 2, 3, 4];

        wrapper = shallow(
            <Atry
                digitVals={digitVals}
                rg={0}
                rr={1}
                showSendTry={true}
                showRate={true}
                valsRO={true}
                rateRO={true}
                msg={'hola'}
            />
        );
    });

    it('has Digit4 with passed props', () => {
        expect(wrapper.exists()).toBe(true);
        console.log('wrapper: ', wrapper.debug());

        // expect(wrapper.first()).is('DivTc');
        // console.log(
        //     'wrapper.children().children()',
        //     wrapper.first().type()).toBe('DivTc')
        //         .children()
        //         .children()
        //         .children()
        // );

        // expect(
        //     wrapper.containsMatchingElement(
        //         <Digit value={5} first={true} readOnly={!vals4ReadOnly} />
        //     )
        // ).toBe(true);
    });
});
