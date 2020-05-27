import React from 'react';
import { Icon } from './icon';

export default {
    title: 'Icon/library',
    component: Icon,
};

export const all = () => (
    <>
        <Icon name="alertTriangle" />
        <Icon name="arrowLeft" />
        <Icon name="check" />
        <Icon name="chevronDown" />
        <Icon name="chevronUp" />
        <Icon name="copy" />
        <Icon name="edit" />
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
        <Icon name="x" />
    </>
);

all.story = {
    decorators: [(storyFn: () => React.ReactElement) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {storyFn()}
        </div>
    )],
};

export const alertTriangle = () => (
    <Icon name="alertTriangle" />
);

export const arrowLeft = () => (
    <Icon name="arrowLeft" />
);

export const check = () => (
    <Icon name="check" />
);

export const chevronDown = () => (
    <Icon name="chevronDown" />
);

export const chevronUp = () => (
    <Icon name="chevronUp" />
);

export const copy = () => (
    <Icon name="copy" />
);

export const edit = () => (
    <Icon name="edit" />
);

export const helpCircle = () => (
    <Icon name="helpCircle" />
);

export const home = () => (
    <Icon name="home" />
);

export const info = () => (
    <Icon name="info" />
);

export const mail = () => (
    <Icon name="mail" />
);

export const mapPin = () => (
    <Icon name="mapPin" />
);

export const menu = () => (
    <Icon name="menu" />
);

export const moreHorizontal = () => (
    <Icon name="moreHorizontal" />
);

export const open = () => (
    <Icon name="open" />
);

export const phone = () => (
    <Icon name="phone" />
);

export const search = () => (
    <Icon name="search" />
);

export const trash = () => (
    <Icon name="trash" />
);

export const x = () => (
    <Icon name="x" />
);
