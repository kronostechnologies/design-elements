import { shallow } from 'enzyme';
import { ExternalLink } from '~/components/external-link/external-link';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';

describe('External Link', () => {
    it('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(
            <ExternalLink onClick={callback} href="#" label="External Link" />,
        );

        wrapper.find(ExternalLink).simulate('click');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('displays screen-reader-only text when link opens in a new tab (target="_blank")', () => {
        const wrapper = shallow(<ExternalLink href="#" label="External Link" target="_blank" />);

        expect(getByTestId(wrapper, 'screen-reader-text').exists()).toBe(true);
    });
});
