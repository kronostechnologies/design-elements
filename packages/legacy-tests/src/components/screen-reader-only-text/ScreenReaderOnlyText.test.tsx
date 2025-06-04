import { ScreenReaderOnlyText } from '~/components/screen-reader-only-text/ScreenReaderOnlyText';
import { mountWithProviders } from '../../test-utils/renderer';

describe('ScreenReaderOnlyText', () => {
    it('matches snapshot', () => {
        const wrapper = mountWithProviders(
            <ScreenReaderOnlyText label="test" />,
        );

        expect(wrapper).toMatchSnapshot();
    });
});
