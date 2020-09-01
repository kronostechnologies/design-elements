import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// tslint:disable-next-line:no-import-side-effect
import 'jest-styled-components';
import { extendExpectWithMoney } from './setup/extend-expect-with-money';

extendExpectWithMoney();
configure({ adapter: new Adapter() });

jest.mock('@design-elements/styles/body.scss', () => ({
    use: jest.fn(),
    unuse: jest.fn(),
}));
