import { GlobalBanner } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';
import { DeviceContextDecorator } from './utils/device-context-decorator';

export default {
    title: 'Feedback/GlobalBanner',
    component: GlobalBanner,
    decorators: [DeviceContextDecorator],
};

export const GlobalBanners: Story = () => (
    <>
        <GlobalBanner label="Attention." type="alert">Vous utilisez présentement...</GlobalBanner>
        <br />
        <GlobalBanner label="Personnification en cours." type="warning">
            WARNING! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </GlobalBanner>
        <br />
        <GlobalBanner label="Mot de passe expiré." type="info">info</GlobalBanner>
    </>
);
