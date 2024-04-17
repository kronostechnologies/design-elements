import { MenuButton } from '@equisoft/design-elements-react';
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
    title: 'Components/Menu Button',
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

export const Primary: Story = () => (
    <>
        <MenuButton options={options} buttonType="primary">Button</MenuButton>
    </>
);

export const Secondary: Story = () => (
    <>
        <MenuButton options={options} buttonType="secondary">Button</MenuButton>
    </>
);

export const Tertiary: Story = () => (
    <>
        <MenuButton options={options} buttonType="tertiary">Button</MenuButton>
    </>
);

export const IconPrimary: Story = () => (
    <MenuButton iconName="moreVertical" options={options} buttonType="primary" />
);

export const IconSecondary: Story = () => (
    <MenuButton iconName="moreVertical" options={options} buttonType="secondary" />
);

export const IconTertiary: Story = () => (
    <MenuButton iconName="moreVertical" options={options} buttonType="tertiary" />
);
