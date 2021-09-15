import { Icon } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React, { ComponentType } from 'react';

export default {
    title: 'Icons/Library',
    component: Icon,
};

export const All: Story = () => (
    <>
        <Icon name="alertTriangle" />
        <Icon name="arrowLeft" />
        <Icon name="check" />
        <Icon name="chevronDown" />
        <Icon name="chevronUp" />
        <Icon name="copy" />
        <Icon name="bell" />
        <Icon name="bento" />
        <Icon name="edit" />
        <Icon name="equisoft" />
        <Icon name="files" />
        <Icon name="helpCircle" />
        <Icon name="home" />
        <Icon name="info" />
        <Icon name="mail" />
        <Icon name="mapPin" />
        <Icon name="menu" />
        <Icon name="moreHorizontal" />
        <Icon name="open" />
        <Icon name="phone" />
        <Icon name="search" />
        <Icon name="trash" />
        <Icon name="user" />
        <Icon name="x" />
    </>
);

All.decorators = [
    (DecoratedStory: ComponentType) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <DecoratedStory />
        </div>
    ),
];

export const AlertTriangle: Story = () => (
    <Icon name="alertTriangle" />
);

export const ArrowLeft: Story = () => (
    <Icon name="arrowLeft" />
);

export const Check: Story = () => (
    <Icon name="check" />
);

export const ChevronDown: Story = () => (
    <Icon name="chevronDown" />
);

export const ChevronUp: Story = () => (
    <Icon name="chevronUp" />
);

export const Copy: Story = () => (
    <Icon name="copy" />
);

export const Edit: Story = () => (
    <Icon name="edit" />
);

export const Files: Story = () => (
    <Icon name="files" />
);

export const HelpCircle: Story = () => (
    <Icon name="helpCircle" />
);

export const Home: Story = () => (
    <Icon name="home" />
);

export const Info: Story = () => (
    <Icon name="info" />
);

export const Mail: Story = () => (
    <Icon name="mail" />
);

export const MapPin: Story = () => (
    <Icon name="mapPin" />
);

export const Menu: Story = () => (
    <Icon name="menu" />
);

export const MoreHorizontal: Story = () => (
    <Icon name="moreHorizontal" />
);

export const Open: Story = () => (
    <Icon name="open" />
);

export const Phone: Story = () => (
    <Icon name="phone" />
);

export const Search: Story = () => (
    <Icon name="search" />
);

export const Trash: Story = () => (
    <Icon name="trash" />
);

export const User: Story = () => (
    <Icon name="user" />
);

export const X: Story = () => (
    <Icon name="x" />
);
