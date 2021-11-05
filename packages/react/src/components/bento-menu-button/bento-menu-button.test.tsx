import React from 'react';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { BentoMenuButton } from './bento-menu-button';
import { ExternalItemProps, NavItemProps } from '../dropdown-menu/list-items';
import { getByTestId } from '../../test-utils/enzyme-selectors';

jest.mock('../../utils/uuid');

const onClick = jest.fn();
const products: NavItemProps[] = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testa',
        onClick,
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testb',
        onClick,
        disabled: true,
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
        onClick,
    },
    {
        label: 'Option B',
        href: '/testb',
        disabled: true,
        onClick,
    },
];

describe('BentoMenuButton', () => {
    beforeEach(() => {
        onClick.mockReset();
    });

    it('should call product on click when a product is clicked', () => {
        const wrapper = mountWithProviders(
            <BentoMenuButton productLinks={products} externalLinks={externals} />,
        );

        const productA = getByTestId(wrapper, 'product-optionA');
        productA.invoke('onClick')();

        expect(onClick).toHaveBeenCalled();
    });

    it('should not call product on click when a product is disabled', () => {
        const wrapper = mountWithProviders(
            <BentoMenuButton productLinks={products} externalLinks={externals} />,
        );

        const productB = getByTestId(wrapper, 'product-optionB');
        expect(productB.prop('onClick')).toBe(undefined);
    });

    it('should call external on click when a external is clicked', () => {
        const wrapper = mountWithProviders(
            <BentoMenuButton productLinks={products} externalLinks={externals} />,
        );

        const externalA = getByTestId(wrapper, 'external-Option A');
        externalA.invoke('onClick')();

        expect(onClick).toHaveBeenCalled();
    });

    it('should not call external on click when a external is disabled', () => {
        const wrapper = mountWithProviders(
            <BentoMenuButton productLinks={products} externalLinks={externals} />,
        );

        const externalB = getByTestId(wrapper, 'external-Option B');
        expect(externalB.prop('onClick')).toBe(undefined);
    });

    it('should not show Products section when productLinks array is empty', () => {
        const wrapper = mountWithProviders(
            <BentoMenuButton productLinks={[]} externalLinks={externals} />,
        );

        expect(getByTestId(wrapper, 'products-group').exists()).toBe(false);
    });

    it('should not show Resources section when externalLinks array is empty', () => {
        const wrapper = mountWithProviders(
            <BentoMenuButton productLinks={products} externalLinks={[]} />,
        );

        expect(getByTestId(wrapper, 'resources-group').exists()).toBe(false);
    });

    test('Matches Snapshot (isDiv)', () => {
        const tree = renderWithProviders(
            <BentoMenuButton isDiv productLinks={products} externalLinks={externals} />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches Snapshot', () => {
        const tree = renderWithProviders(
            <BentoMenuButton productLinks={products} externalLinks={externals} />,
        );

        expect(tree).toMatchSnapshot();
    });
});
