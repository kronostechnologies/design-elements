import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme } from '../../test-utils/renderer';
import { Combobox } from './combobox';

describe('Combobox', () => {
    test('has controllable data-testid', () => {
        const wrapper = mountWithTheme(
            <Combobox data-testid="some-data-testid" />,
        );

        expect(getByTestId(wrapper, 'some-data-testid').exists()).toBe(true);
    });
});
