import { MenuButton, MenuOption } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const options: MenuOption[] = [
    {
        label: 'Option 1',
        onClick: () => console.info('Option 1 clicked'),
    },
    {
        label: 'Option 2',
        onClick: () => console.info('Option 2 clicked'),
    },
    {
        label: 'Option 3',
        onClick: () => console.info('Option 3 clicked'),
    },
    {
        label: 'Option 4',
        onClick: () => console.info('Option 4 clicked'),
    },
];

const MenuButtonMeta: Meta<typeof MenuButton> = {
    title: 'Components/Menu Button',
    component: MenuButton,
    args: {
        buttonType: 'primary',
    },
    argTypes: {
        options: {
            control: { disable: true },
        },
        onMenuVisibilityChanged: {
            control: { disable: true },
        },
    },
    render: (args) => (
        <MenuButton
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
            options={options}
        >
            Menu
        </MenuButton>
    ),
};

export default MenuButtonMeta;
type Story = StoryObj<typeof MenuButton>;

export const Primary: Story = {
    ...MenuButtonMeta,
};

export const Secondary: Story = {
    ...MenuButtonMeta,
    args: {
        buttonType: 'secondary',
    },
};

export const Tertiary: Story = {
    ...MenuButtonMeta,
    args: {
        buttonType: 'tertiary',
    },
};

export const PrimaryDisabled: Story = {
    ...MenuButtonMeta,
    args: {
        disabled: true,
    },
};

export const IconPrimary: Story = {
    ...MenuButtonMeta,
    args: {
        iconName: 'moreVertical',
        buttonType: 'tertiary',
        tooltip: { label: 'A tooltip', desktopPlacement: 'right' },
    },
};

export const IconSecondary: Story = {
    ...MenuButtonMeta,
    args: {
        iconName: 'moreVertical',
        buttonType: 'secondary',
    },
};

export const IconTertiary: Story = {
    ...MenuButtonMeta,
    args: {
        iconName: 'moreVertical',
        buttonType: 'tertiary',
    },
};
