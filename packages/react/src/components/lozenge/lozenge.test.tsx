import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { Lozenge } from './lozenge';

describe('Lozenge', () => {
    test('has icon when icon prop is specified', () => {
        const wrapper = shallow(<Lozenge icon="home">Test</Lozenge>);

        expect(getByTestId(wrapper, 'lozenge-icon').exists()).toBe(true);
    });

    test('matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(<Lozenge>Hello World</Lozenge>),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
