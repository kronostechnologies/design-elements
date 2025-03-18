import Adapter from '@cfaester/enzyme-adapter-react-18';
import { configure } from 'enzyme';
import { TextEncoder } from 'util';
// tslint:disable-next-line:no-import-side-effect
import 'jest-styled-components';

globalThis.TextEncoder = TextEncoder;

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

{
    let counter = 0;
    jest.mock('../src/utils/uuid', () => ({
        // eslint-disable-next-line no-plusplus
        v4: () => `uuid${++counter}`,
    }));

    beforeEach(() => {
        counter = 0;
    });
}
