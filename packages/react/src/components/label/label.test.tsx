import { mountWithTheme, renderWithTheme } from '../../test-utils/renderer';
import { Label } from './label';
import { Tooltip } from '../tooltip/tooltip';

describe('Label', () => {
    test('contains tooltip when tooltip prop is defined', () => {
        const wrapper = mountWithTheme(<Label forId="test" tooltip={{ label: 'test' }}>Test</Label>);

        expect(wrapper.find(Tooltip).exists()).toBe(true);
    });

    test('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <Label forId="test-id">
                Children
            </Label>,
        );

        expect(tree).toMatchSnapshot();
    });
});
