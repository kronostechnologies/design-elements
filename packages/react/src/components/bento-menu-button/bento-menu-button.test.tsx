import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, renderGlobalStylesSynchronously } from '../../test-utils/renderer';
import { ExternalItemProps, NavItemProps } from '../dropdown-menu';
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

function clickOnMenuButton(): Promise<void> {
    return userEvent.click(screen.getByTestId('menu-button'));
}

describe('BentoMenuButton', () => {
    let products: NavItemProps[];
    let externals: ExternalItemProps[];

    beforeEach(() => {
        products = givenProducts();
        externals = givenExternals();
    });

    beforeAll(() => {
        renderGlobalStylesSynchronously(true);
    });

    afterAll(() => {
        renderGlobalStylesSynchronously(false);
    });

    it('should throw exception if both productGroups and productLinks are passed', () => {
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

    it('Matches Snapshot (tag="nav")', () => {
        const { container } = renderWithProviders(
            <BentoMenuButton tag="nav" productLinks={products} externalLinks={externals} />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Matches Snapshot (productLinks and externalLinks)', async () => {
        const { baseElement } = renderWithProviders(
            <BentoMenuButton productLinks={products} externalLinks={externals} />,
        );
        const menuButton = screen.getByTestId('menu-button');
        await userEvent.click(menuButton);

        expect([document.head, baseElement]).toMatchSnapshot();
    });

    it('Matches Snapshot (productGroups and externalLinks)', async () => {
        const productGroupA = {
            label: 'Product Group A',
            name: 'A',
            productLinks: products,
        };
        const productGroupB = {
            label: 'Product Group B',
            name: 'B',
            productLinks: givenOtherProducts(),
        };

        const { baseElement } = renderWithProviders(
            <BentoMenuButton
                productGroups={[productGroupA, productGroupB]}
                externalLinks={externals}
            />,
        );
        const menuButton = screen.getByTestId('menu-button');
        await userEvent.click(menuButton);

        expect([document.head, baseElement]).toMatchSnapshot();
    });

    it('should call product on click when a product is clicked', async () => {
        renderWithProviders(
            <BentoMenuButton productLinks={products} externalLinks={externals} />,
        );
        await clickOnMenuButton();

        const productA = screen.getByTestId('listitem-optionA');
        await userEvent.click(productA);

        expect(products[0].onClick).toHaveBeenCalled();
    });

    it('should not call product on click when a product is disabled', async () => {
        renderWithProviders(
            <BentoMenuButton productLinks={products} externalLinks={externals} />,
        );
        await clickOnMenuButton();

        const productB = screen.getByTestId('listitem-optionB');

        await expect(userEvent.click(productB)).toReject();
        expect(products[1].onClick).not.toHaveBeenCalled();
    });

    it('should call external on click when a external is clicked', async () => {
        renderWithProviders(
            <BentoMenuButton productLinks={products} externalLinks={externals} />,
        );
        await clickOnMenuButton();

        const resourcesGroup = screen.getByTestId('resources-group');
        const externalA = within(resourcesGroup).getByText('Option A');
        await userEvent.click(externalA);

        expect(externals[0].onClick).toHaveBeenCalled();
    });

    it('should not call external on click when a external is disabled', async () => {
        renderWithProviders(
            <BentoMenuButton productLinks={products} externalLinks={externals} />,
        );
        await clickOnMenuButton();

        const resourcesGroup = screen.getByTestId('resources-group');
        const externalB = within(resourcesGroup).getByText('Option B');

        await expect(userEvent.click(externalB)).toReject();
        expect(externals[1].onClick).not.toHaveBeenCalled();
    });

    it('should not show Products section when productLinks array is empty', async () => {
        renderWithProviders(
            <BentoMenuButton productLinks={[]} externalLinks={externals} />,
        );
        await clickOnMenuButton();

        expect(screen.queryByTestId('products-group')).not.toBeInTheDocument();
    });

    it('should not show Resources section when externalLinks array is empty', async () => {
        renderWithProviders(
            <BentoMenuButton productLinks={products} externalLinks={[]} />,
        );
        await clickOnMenuButton();

        expect(screen.queryByTestId('resources-group')).not.toBeInTheDocument();
    });
});
