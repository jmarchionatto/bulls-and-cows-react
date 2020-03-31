import React from 'react';
import DigitsLine from './DigitsLine';

/**
 * UserDigitsLine is a DigitsLine which Digit4 fields are read-write and the rr and rg read-only
 */
const UserDigitsLine = () => <DigitsLine valsReadOnly={false} />;

export default UserDigitsLine;
