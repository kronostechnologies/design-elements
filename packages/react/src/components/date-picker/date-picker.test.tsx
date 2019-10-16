import React from 'react';
import renderer from 'react-test-renderer';

import DatePicker from './date-picker';

const setup = (position: string) => {
    const tree = renderer.create(
        <DatePicker position={position} />,
    ).toJSON();
    return tree;
};

describe('Date Picker', () => {
    test('Renders top left calendar', () => {
        const tree = setup('topLeft');
        expect(tree).toMatchSnapshot();
    });
    test('Renders top right calendar', () => {
        const tree = setup('topRight');
        expect(tree).toMatchSnapshot();
    });
    test('Renders bottom left calendar', () => {
        const tree = setup('bottomLeft');
        expect(tree).toMatchSnapshot();
    });
    test('Renders bottom right calendar', () => {
        const tree = setup('bottomRight');
        expect(tree).toMatchSnapshot();
    });
});
