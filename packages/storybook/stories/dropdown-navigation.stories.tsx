import { GlobalHeader, DropdownNavigation, NavListOption } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';
import { RouterDecorator } from './utils/router-decorator';

const StyledDiv = styled.div`
    height: 180px;
`;

const options: NavListOption[] = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testa',
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testb',
    },
    {
        label: 'Option C',
        value: 'optionC',
        href: '/testc',
    },
    {
        label: 'Option D',
        value: 'optionD',
        href: '/testd',
    },
];

const DropdownNavigationMeta: Meta<typeof DropdownNavigation> = {
    title: 'Components/Dropdown Navigation',
    component: DropdownNavigation,
    decorators: [RouterDecorator, decorateWith(StyledDiv)],
    argTypes: {
        onDropdownVisibilityChanged: {
            control: { disable: true },
        },
        onLinkSelected: {
            control: { disable: true },
        },
        options: {
            control: { disable: true },
        },
    },
    render: (args) => (
        <GlobalHeader>
            <DropdownNavigation
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...args}
                data-testid="some-data-testid"
                options={options}
            >
                Menu
            </DropdownNavigation>
        </GlobalHeader>
    ),
};

export default DropdownNavigationMeta;
type Story = StoryObj<typeof DropdownNavigation>;

export const Desktop: Story = {
    ...DropdownNavigationMeta,
};
Desktop.decorators = [DesktopDecorator];

export const DesktopIconOnly: Story = {
    ...DropdownNavigationMeta,
    args: {
        iconOnly: true,
        iconName: 'home',
    },
};
DesktopIconOnly.decorators = [DesktopDecorator];

export const Mobile: Story = {
    ...DropdownNavigationMeta,
};
Mobile.decorators = [MobileDecorator];

export const MobileIconOnly: Story = {
    ...DropdownNavigationMeta,
    args: {
        iconOnly: true,
        iconName: 'home',
    },
};
MobileIconOnly.decorators = [MobileDecorator];
