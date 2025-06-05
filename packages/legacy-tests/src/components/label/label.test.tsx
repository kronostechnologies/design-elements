import { Label } from '~/components/label/label';
import { Tooltip } from '~/components/tooltip/tooltip';
import { mountWithTheme, renderWithTheme } from '../../test-utils/renderer';

describe('Label', () => {
    it('contains tooltip when tooltip prop is defined', () => {
        const wrapper = mountWithTheme(<Label forId="test" tooltip={{ label: 'test' }}>Test</Label>);

        expect(wrapper.find(Tooltip).exists()).toBe(true);
    });

    it('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <Label forId="test-id">
                Children
            </Label>,
        );

        expect(tree).toMatchSnapshot();
    });
});
