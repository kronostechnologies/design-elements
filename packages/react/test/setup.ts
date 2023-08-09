import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
// tslint:disable-next-line:no-import-side-effect
import 'jest-styled-components';
import { extendExpectWithMoney } from './setup/extend-expect-with-money';

extendExpectWithMoney();
configure({ adapter: new Adapter() });

jest.mock('any.scss', () => ({
    use: jest.fn(),
    unuse: jest.fn(),
    toString: () => 'body {}',
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useLayoutEffect: jest.requireActual('react').useEffect,
}));
