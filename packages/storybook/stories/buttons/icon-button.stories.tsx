import { IconButton } from '@equisoft/design-elements-react';
import React from 'react';

export default {
    title: 'Buttons/Icon',
    component: IconButton,
};

export const iconButtons = () => (
    <>
        <IconButton label="home" buttonType={'primary'} iconName="home"/>
        <IconButton label="mail" buttonType={'secondary'} iconName="mail"/>
        <IconButton label="map" buttonType={'tertiary'} iconName="mapPin"/>
    </>
);
export const disabled = () => (
    <>
        <IconButton label="home" buttonType={'primary'} iconName="home" disabled/>
        <IconButton label="mail" buttonType={'secondary'} iconName="mail" disabled/>
        <IconButton label="map" buttonType={'tertiary'} iconName="mapPin" disabled/>
    </>
);
export const eventCallback = () => (
    <IconButton
        label="home"
        iconName="home"
        onClick={() => { console.log('The button has been clicked!'); }}
        buttonType={'primary'}
    />
);
