import { renderWithProviders } from '../../test-utils/renderer';
import { ExternalItemProps, NavItemProps } from '../dropdown-menu/list-items';
import { BentoMenuButton } from './bento-menu-button';

function givenProducts(): NavItemProps[] {
    return [
        {
            label: 'Option A',
            value: 'optionA',
            href: '/testa',
            onClick: jest.fn(),
        },
        {
            label: 'Option B',
            value: 'optionB',
            href: '/testb',
            onClick: jest.fn(),
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
}

function givenOtherProducts(): NavItemProps[] {
    return [
        {
            label: 'Option E',
            value: 'optionE',
            href: '/teste',
            onClick: jest.fn(),
        },
        {
            label: 'Option F',
            value: 'optionF',
            href: '/testf',
        },
    ];
}

function givenExternals(): ExternalItemProps[] {
    return [
        {
            label: 'Option A',
            href: '/testa',
            onClick: jest.fn(),
        },
        {
            label: 'Option B',
            href: '/testb',
            disabled: true,
            onClick: jest.fn(),
        },
    ];
}

describe('BentoMenuButton', () => {
    let products: NavItemProps[];
    let externals: ExternalItemProps[];

    beforeEach(() => {
        products = givenProducts();
        externals = givenExternals();
    });

    test('should throw exception if both productGroups and productLinks are passed', () => {
        const productGroupA = {
            label: 'Product Group A',
            name: 'A',
            productLinks: products,
        };
        const productGroupB = {
            label: 'Product Group A',
            name: 'A',
            productLinks: givenOtherProducts(),
        };

        const callback = (): void => {
            renderWithProviders(
                <BentoMenuButton
                    productGroups={[productGroupA, productGroupB]}
                    productLinks={products}
                    externalLinks={externals}
                />,
            );
        };

        expect(callback).toThrow(Error);
    });

    test('Matches Snapshot (tag="nav")', () => {
        const { container } = renderWithProviders(
            <BentoMenuButton tag="nav" productLinks={products} externalLinks={externals} />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches Snapshot (productLinks and externalLinks)', () => {
        const { container } = renderWithProviders(
            <BentoMenuButton productLinks={products} externalLinks={externals} />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches Snapshot (productGroups and externalLinks)', () => {
        const productGroupA = {
            label: 'Product Group A',
            name: 'A',
            productLinks: products,
        };
        const productGroupB = {
            label: 'Product Group A',
            name: 'A',
            productLinks: givenOtherProducts(),
        };

        const { container } = renderWithProviders(
            <BentoMenuButton
                productGroups={[productGroupA, productGroupB]}
                externalLinks={externals}
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
