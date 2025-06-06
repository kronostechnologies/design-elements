import { BentoMenuButton } from '~/components/bento-menu-button/bento-menu-button';
import { ExternalItemProps, NavItemProps } from '~/components/dropdown-menu/list-items';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';

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

    it('should call product on click when a product is clicked', () => {
        const wrapper = mountWithProviders(
            <BentoMenuButton productLinks={products} externalLinks={externals} />,
        );

        const productA = getByTestId(wrapper, 'product-optionA');
        productA.invoke('onClick')();

        expect(products[0].onClick).toHaveBeenCalled();
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

        expect(externals[0].onClick).toHaveBeenCalled();
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
});
