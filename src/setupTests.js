import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import 'jest-styled-components';

// Test configuration doesn't work well if this file is moved to tests folder
configure({ adapter: new Adapter() });
