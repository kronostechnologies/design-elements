import React from 'react';

import { IconButton } from '@equisoft/design-elements-react';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

export default {
    title: 'Buttons/Icon',
    component: IconButton,
};

export const iconButtons = () => (
    <>
        <IconButton buttonType={'primary' as ButtonType} iconName="home"/>
        <IconButton buttonType={'secondary' as ButtonType} iconName="mail"/>
        <IconButton buttonType={'tertiary' as ButtonType} iconName="mapPin"/>
    </>
);
export const mobile = () => (
    <>
        <IconButton buttonType={'primary' as ButtonType} iconName="home" device="mobile"/>
        <IconButton buttonType={'secondary' as ButtonType} iconName="mail" device="mobile"/>
        <IconButton buttonType={'tertiary' as ButtonType} iconName="mapPin" device="mobile"/>
    </>
);
export const disabled = () => (
    <>
        <IconButton buttonType={'primary' as ButtonType} iconName="home" disabled/>
        <IconButton buttonType={'secondary' as ButtonType} iconName="mail" disabled/>
        <IconButton buttonType={'tertiary' as ButtonType} iconName="mapPin" disabled/>
    </>
);
export const eventCallback = () => (
    <>
        <IconButton
            iconName="home"
            onClick={() => { console.log('The button has been clicked!'); }}
            buttonType={'primary' as ButtonType}
        />
    </>
);
