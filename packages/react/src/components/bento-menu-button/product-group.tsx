import { FunctionComponent, PropsWithChildren, RefObject } from 'react';
import { GroupItem, NavItem, NavItemProps } from '../dropdown-menu/list-items';
import { useDataAttributes } from '../../hooks/use-data-attributes';

export interface ProductGroupProps {
    onClick?(): void;
    firstItemRef?: RefObject<HTMLAnchorElement>;
    label: string;
    name: string;
    productLinks: NavItemProps[];
}

export const ProductGroup: FunctionComponent<PropsWithChildren<ProductGroupProps>> = ({
    onClick,
    firstItemRef,
    label,
    name,
    productLinks,
    ...props
}) => {
    const dataAttributes = useDataAttributes(props);

    return (
        <GroupItem
            label={label}
            id={`${name}-links`}
            data-testid={dataAttributes['data-testid'] ?? 'products-group'}
        >
            {productLinks.map((product, idx) => (
                <NavItem
                    ref={idx === 0 ? firstItemRef : undefined}
                    target="_blank"
                    data-testid={`${name}-${product.value}`}
                    key={`${name}-${product.value}`}
                    value={product.value}
                    label={product.label}
                    href={product.href}
                    iconName={product.iconName || 'equisoft'}
                    description={product.description}
                    isHtmlLink={product.isHtmlLink}
                    lozenge={product.lozenge}
                    disabled={product.disabled}
                    onClick={product.disabled ? undefined : (event) => {
                        product.onClick?.(event);
                        onClick?.();
                    }}
                />
            ))}
        </GroupItem>
    );
};

ProductGroup.displayName = 'ProductGroup';
