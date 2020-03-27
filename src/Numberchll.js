import React from 'react';
import ReactDOM from 'react-dom';
import DigitsLine from './DigitsLine';
import Digit4 from './Digit4';
import Digit from './Digit';

// ReactDOM.render(<h1>Hola Cachito</h1>, document.body.appendChild(document.createElement('DIV')));
// ReactDOM.render(<Digit value="1" />, document.body.appendChild(document.createElement('DIV')));

// ReactDOM.render(
//     <Digit4 digitValues="1234" />,
//     document.body.appendChild(document.createElement('DIV'))
// );

let digitVals = ['1', '2', '3', '4'];
ReactDOM.render(
    <DigitsLine digitVals={digitVals} rg="5" rr="6" visib="yes" />,
    document.body.appendChild(document.createElement('DIV'))
);
