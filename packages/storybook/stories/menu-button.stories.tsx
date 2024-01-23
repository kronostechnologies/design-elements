import { MenuButton, MenuButtonProps, Tooltip } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';

const StyledDiv = styled.div`
    display: flex;
    height: 180px;
    justify-content: center;
    width: 100%;
`;

export default {
    title: 'Components/Controls/Menu Button',
    component: MenuButton,
    decorators: [decorateWith(StyledDiv)],
};

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

const scrollableOptions = [
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
    {
        label: 'Option 5',
        onClick: () => console.info('Option 5 clicked'),
    },
    {
        label: 'Option 6',
        onClick: () => console.info('Option 6 clicked'),
    },
];

const submenuOptions = [
    {
        label: 'Option 1',
        onClick: () => console.info('Option 1 clicked'),
    },
    {
        label: 'Option 2',
        onClick: () => console.info('Option 2 clicked'),
        options,
    },
    {
        label: 'Option 3',
        onClick: () => console.info('Option 3 clicked'),
    },
];

const optionsWithIcons: MenuButtonProps['options'] = [
    {
        label: 'Option 1',
        onClick: () => console.info('Option 1 clicked'),
    },
    {
        label: 'Option 2',
        iconName: 'check',
        onClick: () => console.info('Option 2 clicked'),
    },
    {
        label: 'Option 3',
        iconName: 'settings',
        onClick: () => console.info('Option 3 clicked'),
    },
];

const optionsWithIconsAndSubmenu: MenuButtonProps['options'] = [
    {
        label: 'Option 1',
        onClick: () => console.info('Option 1 clicked'),
    },
    {
        label: 'Option 2',
        iconName: 'check',
        onClick: () => console.info('Option 2 clicked'),
        options,
    },
    {
        label: 'Option 3',
        iconName: 'settings',
        onClick: () => console.info('Option 3 clicked'),
    },
];

const optionsWithDisabled = [
    {
        label: 'Option 1',
        onClick: () => console.info('Option 1 clicked'),
    },
    {
        label: 'Option 2',
        disabled: true,
        onClick: () => console.info('Option 2 clicked'),
    },
    {
        label: 'Option 3',
        onClick: () => console.info('Option 3 clicked'),
    },
];

export const Normal: Story = () => (
    <>
        <MenuButton options={options} buttonType="primary">Button</MenuButton>
        <MenuButton options={options} buttonType="primary" inverted>Button</MenuButton>
        <MenuButton options={options} buttonType="secondary">Button</MenuButton>
        <MenuButton options={options} buttonType="tertiary">Button</MenuButton>
        <MenuButton options={options} buttonType="destructive">Button</MenuButton>
    </>
);

export const IconButton: Story = () => (
    <MenuButton iconName="moreVertical" options={options} buttonType="primary" />
);

export const LeftPlacement: Story = () => (
    <MenuButton
        className="end-align"
        iconName="moreVertical"
        options={options}
        buttonType="primary"
        menuPlacement="left"
    />
);

export const DefaultOpen: Story = () => (
    <MenuButton options={options} defaultOpen buttonType="primary">Button</MenuButton>
);

export const WithSubmenu: Story = () => (
    <MenuButton options={submenuOptions} buttonType="primary">Button</MenuButton>
);

export const OptionsWithIcons: Story = () => (
    <>
        <MenuButton options={optionsWithIcons} buttonType="primary">Button</MenuButton>
        <MenuButton options={optionsWithIconsAndSubmenu} buttonType="primary">With submenu</MenuButton>
    </>
);

export const OptionsWithDisabled: Story = () => (
    <MenuButton options={optionsWithDisabled} buttonType="primary">Button</MenuButton>
);

const optionsWithGroups: MenuButtonProps['options'] = [
    {
        groupLabel: 'Group 1',
        groupOptions: [
            {
                label: 'Option 1.1',
                onClick: () => console.info('Option 1.1 clicked'),
            },
            {
                label: 'Option 1.2',
                onClick: () => console.info('Option 1.2 clicked'),
            },
        ],
    },
    {
        groupLabel: 'Group 2',
        groupOptions: [
            {
                label: 'Option 2.1',
                onClick: () => console.info('Option 2.1 clicked'),
            },
            {
                label: 'Option 2.2',
                onClick: () => console.info('Option 2.2 clicked'),
            },
        ],
    },
];

export const OptionsWithGrouping: Story = () => (
    <MenuButton
        options={optionsWithGroups}
        buttonType="primary"
    >
        Button
    </MenuButton>
);

export const Scrollable: Story = () => (
    <MenuButton options={scrollableOptions} buttonType="primary">Button</MenuButton>
);

export const VisibilityChangeEvent: Story = () => (
    <MenuButton
        options={options}
        buttonType="primary"
        onMenuVisibilityChanged={(visibility) => console.info(`MenuButton visibility: ${visibility}`)}
    >
        Button
    </MenuButton>
);

export const TooltipWrapperWithClickableItems: Story = () => (
    <Tooltip label="Label" desktopPlacement="right">
        <MenuButton
            options={[
                {
                    label: 'Option 1',
                    // eslint-disable-next-line no-console
                    onClick: () => console.log('option 1 clicked'),
                },
                {
                    label: 'Option 2',
                    // eslint-disable-next-line no-console
                    onClick: () => console.log('option 2 clicked'),
                },
            ]}
            buttonType="primary"
            onMenuVisibilityChanged={(visibility) => console.info(`MenuButton visibility: ${visibility}`)}
        >
            Menu
        </MenuButton>
    </Tooltip>
);
