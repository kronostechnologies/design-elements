import React from 'react';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { BentoMenuButton } from './bento-menu-button';
import { ExternalItemProps, NavItemProps } from '../dropdown-menu/list-items';

jest.mock('../../utils/uuid');

const productA: NavItemProps = {
    label: 'Option A',
    value: 'optionA',
    href: '/testa',
};

const products: NavItemProps[] = [
    productA,
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

const externalOptionA: ExternalItemProps = {
    label: 'Option A',
    href: '/testa',
};

const externals: ExternalItemProps[] = [
    externalOptionA,
];

describe('BentoMenuButton', () => {
    test('Matches Snapshot', () => {
        const tree = renderWithProviders(
            <BentoMenuButton productLinks={products} externalLinks={externals} />,
        );

        expect(tree).toMatchSnapshot();
    });

    it('should call product on click when a product is clicked', () => {
        const onClick = jest.fn();
        const wrapper = mountWithProviders(
            <BentoMenuButton productLinks={[{ ...productA, onClick }]} externalLinks={externals} />,
        );

        const product = getByTestId(wrapper, `product-${productA.value}`);
        product.simulate('click');

        expect(onClick).toHaveBeenCalled();
    });

    it('should call external link on click when an external link is clicked', () => {
        const onClick = jest.fn();
        externalOptionA.onClick = onClick;
        const wrapper = mountWithProviders(
            <BentoMenuButton productLinks={products} externalLinks={[{ ...externalOptionA, onClick }]} />,
        );

        const externalLink = getByTestId(wrapper, `external-${externalOptionA.label}`);
        externalLink.simulate('click');

        expect(onClick).toHaveBeenCalled();
    });
});
