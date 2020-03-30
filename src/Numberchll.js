import React from 'react';
import ReactDOM from 'react-dom';
// import DigitsLine from './DigitsLine';
// import GameRow from './GameRow';
// import App from './App';
// import AskWhoFirst from './AskWhoFirst';
import App from './App';
// import Digit4 from './Digit4';
// import Digit from './Digit';

// ReactDOM.render(<h1>Hola Cachito</h1>, document.body.appendChild(document.createElement('DIV')));
// ReactDOM.render(<Digit value="1" />, document.body.appendChild(document.createElement('DIV')));

// ReactDOM.render(
//     <Digit4 digitValues="1234" />,
//     document.body.appendChild(document.createElement('DIV'))
// );

// let digitVals = ['1', '2', '3', '4'];
// ReactDOM.render(
//     <DigitsLine
//         digitVals={digitVals}
//         rg="5"
//         rr="6"
//         valsRO={true}
//         rateRO={true}
//         showSendTry={true}
//         showSendRate={true}
//     />,
//     document.body.appendChild(document.createElement('DIV'))
// );

// const aRow = {
//     userTry: {
//         digitVals: ['9', '8', '7', '6'],
//         rg: '1',
//         rr: '2',
//         valsRO: false,
//         rateRO: false,
//         showSendTry: true,
//         showSendRate: true,
//     },
//     compTry: {
//         digitVals: ['5', '4', '3', '2'],
//         rg: '3',
//         rr: '1',
//         valsRO: false,
//         rateRO: false,
//         showSendTry: true,
//         showSendRate: true,
//     },
// };

// ReactDOM.render(<GameRow aRow={aRow} />, document.body.appendChild(document.createElement('DIV')));

// const f = function setUserFirst() {};
// ReactDOM.render(
//     <AskWhoFirst setWhoFirst={f} />,
//     document.body.appendChild(document.createElement('DIV'))
// );

const aRow = {
    userTry: {
        digitVals: ['9', '8', '7', '6'],
        rg: '1',
        rr: '2',
        valsRO: false,
        rateRO: false,
        showSendTry: true,
        showSendRate: true,
    },
    compTry: {
        digitVals: ['5', '4', '3', '2'],
        rg: '3',
        rr: '1',
        valsRO: false,
        rateRO: false,
        showSendTry: true,
        showSendRate: true,
    },
};

ReactDOM.render(<App />, document.body.appendChild(document.createElement('DIV')));
