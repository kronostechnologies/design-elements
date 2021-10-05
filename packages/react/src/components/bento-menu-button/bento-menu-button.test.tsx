import React from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { BentoMenuButton } from './bento-menu-button';
import { ExternalItemProps, NavItemProps } from '../dropdown-menu/list-items';

jest.mock('../../utils/uuid');

const products: NavItemProps[] = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testa',
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testb',
    },
    {
        label: 'Option C',
        value: 'optionC',
        href: '/testc',
    },
    {
        label: 'Option D',
        value: 'optionD',
        href: '/testd',
    },
];

const externals: ExternalItemProps[] = [
    {
        label: 'Option A',
        href: '/testa',
    },
];

describe('BentoMenuButton', () => {
    test('Matches Snapshot', () => {
        const tree = renderWithProviders(
            <BentoMenuButton productLinks={products} externalLinks={externals} />,
        );

        expect(tree).toMatchSnapshot();
    });
});
