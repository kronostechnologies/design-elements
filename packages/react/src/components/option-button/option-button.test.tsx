import { renderWithTheme } from '../../test-utils/renderer';
import { OptionButton } from './option-button';

describe('Option Button', () => {
    test('Is checked', () => {
        const tree = renderWithTheme(<OptionButton label="option" name="test" value={2} checked />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches the snapshot', () => {
        const tree = renderWithTheme(<OptionButton label="option" name="test" value={2} />);

        expect(tree).toMatchSnapshot();
    });
});
