import React from 'react';
import DigitsLine from './DigitsLine';

/**
 * YourDigitsLine is a DigitsLine which Digit4 fields are read-write and the rr and rg read-only
 */
const YourDigitsLine = () => <DigitsLine valsReadOnly={false} />;

export default YourDigitsLine;
