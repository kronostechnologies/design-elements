import { shallow } from 'enzyme';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { renderWithTheme } from '../../test-utils/renderer';
import { Lozenge } from './lozenge';

describe('Lozenge', () => {
    test('has icon when icon prop is specified', () => {
        const wrapper = shallow(<Lozenge icon="home">Test</Lozenge>);

        expect(getByTestId(wrapper, 'lozenge-icon').exists()).toBe(true);
    });

    test('matches the snapshot', () => {
        const tree = renderWithTheme(<Lozenge>Hello World</Lozenge>);

        expect(tree).toMatchSnapshot();
    });

    test('default matches the snapshot', () => {
        const tree = renderWithTheme(<Lozenge type='default'>default</Lozenge>);

        expect(tree).toMatchSnapshot();
    });

    test('success matches the snapshot', () => {
        const tree = renderWithTheme(<Lozenge type='success'>success</Lozenge>);

        expect(tree).toMatchSnapshot();
    });

    test('warning matches the snapshot', () => {
        const tree = renderWithTheme(<Lozenge type='warning'>warning</Lozenge>);

        expect(tree).toMatchSnapshot();
    });

    test('info matches the snapshot', () => {
        const tree = renderWithTheme(<Lozenge type='info'>info</Lozenge>);

        expect(tree).toMatchSnapshot();
    });

    test('alert matches the snapshot', () => {
        const tree = renderWithTheme(<Lozenge type='alert'>alert</Lozenge>);

        expect(tree).toMatchSnapshot();
    });
});
