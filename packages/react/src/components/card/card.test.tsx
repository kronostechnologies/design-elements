import { shallow } from 'enzyme';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { renderWithTheme } from '../../test-utils/renderer';
import { Card } from './card';

describe('Card', () => {
    test('adds data-testid', () => {
        const testId = 'test-id';

        const wrapper = shallow(<Card data-testid={testId}>Test</Card>);

        expect(getByTestId(wrapper, testId).exists()).toBe(true);
    });

    test('Matches the snapshot', () => {
        const wrapper = renderWithTheme(<Card>Hello World</Card>);

        expect(wrapper).toMatchSnapshot();
    });
});
