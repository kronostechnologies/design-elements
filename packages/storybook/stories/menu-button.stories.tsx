import { MenuButton } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';

const StyledDiv = styled.div`
    display: flex;
    height: 180px;
    justify-content: center;
    width: 100%;
`;

const options = [
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
];

const MenuButtonMeta: Meta<typeof MenuButton> = {
    title: 'Components/Menu Button',
    component: MenuButton,
    decorators: [decorateWith(StyledDiv)],
    args: {
        buttonType: 'primary',
    },
    argTypes: {
        options: {
            control: { type: null },
        },
        onMenuVisibilityChanged: {
            control: { type: null },
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

export const IconPrimary: Story = {
    ...MenuButtonMeta,
    args: {
        iconName: 'moreVertical',
        buttonType: 'tertiary',
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
