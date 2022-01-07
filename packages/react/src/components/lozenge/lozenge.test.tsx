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
});
