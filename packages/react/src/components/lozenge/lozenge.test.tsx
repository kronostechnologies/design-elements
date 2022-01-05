import { shallow } from 'enzyme';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { Lozenge } from './lozenge';
import { renderWithTheme } from '../../test-utils/renderer';

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
