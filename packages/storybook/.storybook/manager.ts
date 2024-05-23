import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
    theme: create({
        base: "light",
        brandTitle: "Equisoft Design System",
        brandUrl: "https://equisoft.com",
        brandImage: "./logo-equisoft.svg", // using publicly served /public directory
        brandTarget: '_self',
        colorPrimary: '#006296',
        appBg: '#FAFAFA',
        colorSecondary: '#006296',
        textColor: '#1B1C1E',
        textInverseColor: '#FFFFFF',
        barTextColor: '#006296',
        barSelectedColor: '#006296',
        barBg: '#FAFAFA',
    }),
});
