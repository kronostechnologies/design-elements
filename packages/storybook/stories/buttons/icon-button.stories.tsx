import React from 'react';

import { IconButton } from '@equisoft/design-elements-react';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

export default {
    title: 'Buttons/Icon',
    component: IconButton,
};

export const iconButtons = () => (
    <>
        <IconButton label="home" buttonType={'primary' as ButtonType} iconName="home"/>
        <IconButton label="mail" buttonType={'secondary' as ButtonType} iconName="mail"/>
        <IconButton label="map" buttonType={'tertiary' as ButtonType} iconName="mapPin"/>
    </>
);
export const mobile = () => (
    <>
        <IconButton label="home" buttonType={'primary' as ButtonType} iconName="home" device="mobile"/>
        <IconButton label="mail" buttonType={'secondary' as ButtonType} iconName="mail" device="mobile"/>
        <IconButton label="map" buttonType={'tertiary' as ButtonType} iconName="mapPin" device="mobile"/>
    </>
);
export const disabled = () => (
    <>
        <IconButton label="home" buttonType={'primary' as ButtonType} iconName="home" disabled/>
        <IconButton label="mail" buttonType={'secondary' as ButtonType} iconName="mail" disabled/>
        <IconButton label="map" buttonType={'tertiary' as ButtonType} iconName="mapPin" disabled/>
    </>
);
export const eventCallback = () => (
    <>
        <IconButton
            label="home"
            iconName="home"
            onClick={() => { console.log('The button has been clicked!'); }}
            buttonType={'primary' as ButtonType}
        />
    </>
);
