import { Icon } from '@equisoft/design-elements-react';
import type { API_SidebarOptions } from '@storybook/core/types';
import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';
import { createElement, type MouseEventHandler, type ReactElement } from 'react';

type Item = Parameters<NonNullable<API_SidebarOptions['renderLabel']>>[0];

function createLinkToGithubReleases(item: Item): ReactElement {
    const handleClick: MouseEventHandler = (event) => {
        event.stopPropagation();
    };
    return createElement(
        'a',
        {
            children: [item.name, createElement(Icon, { name: 'externalLink', size: '18' })],
            href: 'https://github.com/kronostechnologies/design-elements/releases',
            onClick: handleClick,
            rel: 'noopener noreferrer',
            style: {
                color: 'inherit',
                display: 'inline-flex',
                gap: '0.5rem',
                textDecoration: 'none',
                width: '100%',
            },
            target: '_blank',
        },
    );
}

addons.setConfig({
    sidebar: {
        renderLabel: (item) => {
            if (item.name === 'Changelog') {
                return createLinkToGithubReleases(item);
            }
            return item.name;
        },
    },
    theme: create({
        base: 'light',
        brandTitle: 'Equisoft Design System',
        brandUrl: 'https://equisoft.com',
        brandImage: './logo-equisoft.svg', // using publicly served /public directory
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
