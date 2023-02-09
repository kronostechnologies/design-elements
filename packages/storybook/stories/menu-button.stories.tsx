import { MenuButton } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';

const StyledDiv = styled.div`
    display: flex;
    height: 180px;
`;

export default {
    title: 'Controls/Menu Button',
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

export const DefaultOpen: Story = () => (
    <MenuButton options={options} defaultOpen buttonType="primary">Button</MenuButton>
);

export const WithSubmenu: Story = () => (
    <MenuButton options={submenuOptions} buttonType="primary">Button</MenuButton>
);

export const Scrollable: Story = () => (
    <MenuButton options={scrollableOptions} buttonType="primary">Button</MenuButton>
);
