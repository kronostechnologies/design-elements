import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as crypto from 'crypto';
import { configure } from 'enzyme';
// tslint:disable-next-line:no-import-side-effect
import 'jest-styled-components';
import React from 'react';
import { extendExpectWithMoney } from './setup/extend-expect-with-money';

React.useLayoutEffect = React.useEffect;

extendExpectWithMoney();
configure({ adapter: new Adapter() });

jest.mock('any.scss', () => ({
    use: jest.fn(),
    unuse: jest.fn(),
    toString: () => 'body {}',
}));

type BufferType =
    Int8Array
    | Int16Array
    | Int32Array
    | Uint8Array
    | Uint16Array
    | Uint32Array
    | Uint8ClampedArray
    | Float32Array
    | Float64Array
    | DataView
    | null;
globalThis.crypto = {
    getRandomValues: function getRandomValues<T extends BufferType>(buffer: T): T {
        return crypto.randomFillSync(buffer as NodeJS.ArrayBufferView) as T;
    },
} as Crypto;
