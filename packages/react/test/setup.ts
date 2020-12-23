import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// tslint:disable-next-line:no-import-side-effect
import 'jest-styled-components';
import React from 'react';
import { extendExpectWithMoney } from './setup/extend-expect-with-money';

React.useLayoutEffect = React.useEffect;

extendExpectWithMoney();
configure({ adapter: new Adapter() });

jest.mock('@design-elements/styles/body.scss', () => ({
    use: jest.fn(),
    unuse: jest.fn(),
    toString: () => 'body {}',
}));
