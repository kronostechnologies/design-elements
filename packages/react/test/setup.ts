import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// tslint:disable-next-line:no-import-side-effect
import 'jest-styled-components';

configure({ adapter: new Adapter() });
