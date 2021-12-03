import { mountWithProviders } from '../../test-utils/renderer';
import { ScreenReaderOnlyText } from './ScreenReaderOnlyText';

describe('ScreenReaderOnlyText', () => {
    it('matches snapshot', () => {
        const wrapper = mountWithProviders(
            <ScreenReaderOnlyText label="test" />,
        );

        expect(wrapper).toMatchSnapshot();
    });
});
