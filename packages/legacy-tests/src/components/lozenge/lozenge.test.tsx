import { shallow } from 'enzyme';
import { Lozenge } from '~/components/lozenge/lozenge';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { renderWithTheme } from '../../test-utils/renderer';

describe('Lozenge', () => {
    it('has icon when icon prop is specified', () => {
        const wrapper = shallow(<Lozenge icon="home">Test</Lozenge>);

        expect(getByTestId(wrapper, 'lozenge-icon').exists()).toBe(true);
    });

    it('matches the snapshot', () => {
        const tree = renderWithTheme(<Lozenge>Hello World</Lozenge>);

        expect(tree).toMatchSnapshot();
    });

    it('default matches the snapshot', () => {
        const tree = renderWithTheme(<Lozenge>default</Lozenge>);

        expect(tree).toMatchSnapshot();
    });

    it('success matches the snapshot', () => {
        const tree = renderWithTheme(<Lozenge variant='success'>success</Lozenge>);

        expect(tree).toMatchSnapshot();
    });

    it('warning matches the snapshot', () => {
        const tree = renderWithTheme(<Lozenge variant='warning'>warning</Lozenge>);

        expect(tree).toMatchSnapshot();
    });

    it('info matches the snapshot', () => {
        const tree = renderWithTheme(<Lozenge variant='info'>info</Lozenge>);

        expect(tree).toMatchSnapshot();
    });

    it('alert matches the snapshot', () => {
        const tree = renderWithTheme(<Lozenge variant='alert'>alert</Lozenge>);

        expect(tree).toMatchSnapshot();
    });
});
