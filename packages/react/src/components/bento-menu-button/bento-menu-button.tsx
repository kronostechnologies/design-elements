import React, {
    ReactElement,
} from 'react';
import styled from 'styled-components';
import { ExternalItem, ExternalItemProps, GroupItem, NavItem, NavItemProps } from '../dropdown-menu/list-items';
import { StyledNavItem } from '../dropdown-menu/list-items/nav-item';
import { StyledExternalLink } from '../dropdown-menu/list-items/external-item';
import { DropdownMenuButton, StyledDropdownMenu } from '../dropdown-menu-button/dropdown-menu-button';
import { Icon } from '../icon/icon';

const StyledDropdownMenuButton = styled(DropdownMenuButton)`
    ${StyledDropdownMenu} {
        padding: var(--spacing-3x) 0;
        max-width: 350px;
        min-width: 200px;
        right: 0;
        width: initial;
    
        ${StyledNavItem} {
            padding: var(--spacing-1x) var(--spacing-4x);
        }
    
        ${StyledExternalLink} {
            padding: 0 var(--spacing-4x);
        }
    
        h3 {
            margin: 0;
            padding: 0 var(--spacing-4x);
            padding-bottom: var(--spacing-1x);
        }
        
        ul:not(:last-child)::after, ol:not(:last-child)::after {
            content: "";
            border-bottom: 1px solid ${({ theme }) => theme.greys.grey};
            display:block;
            margin: var(--spacing-2x) var(--spacing-4x);
        }
    }
`;

interface BentoMenuButtonProps {
    productLinks: NavItemProps[];
    externalLinks: ExternalItemProps[];
}

export function BentoMenuButton({
    productLinks,
    externalLinks,
}: BentoMenuButtonProps): ReactElement {
    return (
        <StyledDropdownMenuButton hasCaret={false} icon={<Icon name="bento" size="16" />}>
            <GroupItem key="productLinks" label="Produits" id="productLinks">
                {productLinks.map((product) => (
                    <NavItem
                        key={`product-${product.id}`}
                        id={product.id}
                        value={product.value}
                        label={product.label}
                        to={product.to}
                        iconName="equisoft"
                        description={product.description}
                    />
                ))}
            </GroupItem>
            <GroupItem key="externalLinks" label="Ressources" id="externalLinks">
                {externalLinks.map((external) => (
                    <ExternalItem
                        key={`external-${external.id}`}
                        id={external.id}
                        href={external.href}
                        label={external.label}
                    />
                ))}
            </GroupItem>
        </StyledDropdownMenuButton>
    );
}
