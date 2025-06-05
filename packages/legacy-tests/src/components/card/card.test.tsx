import { shallow } from 'enzyme';
import { Card } from '~/components/card/card';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { renderWithTheme } from '../../test-utils/renderer';

describe('Card', () => {
    it('adds data-testid', () => {
        const testId = 'test-id';

        const wrapper = shallow(<Card data-testid={testId}>Test</Card>);

        expect(getByTestId(wrapper, testId).exists()).toBe(true);
    });

    it('Matches the snapshot', () => {
        const wrapper = renderWithTheme(<Card>Hello World</Card>);

        expect(wrapper).toMatchSnapshot();
    });
});
