import { NavItemProps } from '~/components/dropdown-menu/list-items';
import { UserProfile } from '~/components/user-profile/user-profile';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { waitForComponentToPaint } from '../../test-utils/enzyme-utils';
import { mountWithProviders } from '../../test-utils/renderer';

const onClick = jest.fn();
const options: NavItemProps[] = [
    {
        href: '/testa',
        label: 'Option A',
        onClick,
        value: 'optionA',
    },
    {
        disabled: true,
        href: '/testb',
        label: 'Option B',
        onClick,
        value: 'optionB',
    },
    {
        href: '/testc',
        label: 'Option C',
        value: 'optionC',
    },
    {
        href: 'www.test.ca',
        isHtmlLink: true,
        label: 'Option D',
        target: '_blank',
        value: 'optionD',
    },
    {
        href: 'www.test.ca',
        isExternalLink: true,
        label: 'Option E',
        value: 'optionE',
    },
];

describe('UserProfile', () => {
    beforeEach(() => {
        onClick.mockReset();
    });

    it('should contain username', () => {
        const username = 'John Doe';
        const wrapper = mountWithProviders(<UserProfile username={username} options={options} />);

        expect(getByTestId(wrapper, 'menu-button').contains(username)).toBe(true);
    });

    it('should call on click when an option is clicked', () => {
        const username = 'John Doe';
        const wrapper = mountWithProviders(<UserProfile username={username} options={options} />);
        getByTestId(wrapper, 'menu-button').simulate('click');

        const actionA = getByTestId(wrapper, 'action-optionA');
        actionA.invoke('onClick')();

        expect(onClick).toHaveBeenCalled();
    });

    it('should not call on click when an option is disabled', async () => {
        const username = 'John Doe';
        const wrapper = mountWithProviders(<UserProfile username={username} options={options} />);
        getByTestId(wrapper, 'menu-button').simulate('click');
        await waitForComponentToPaint(wrapper);

        const actionB = getByTestId(wrapper, 'action-optionB');
        expect(actionB.prop('onClick')).toBe(undefined);
    });
});
