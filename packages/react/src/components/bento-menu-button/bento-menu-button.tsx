/* eslint-disable react/jsx-props-no-spreading */
import React, { FunctionComponent, useRef } from 'react';
import styled from 'styled-components';
import { ExternalItem, ExternalItemProps, GroupItem, NavItem, NavItemProps } from '../dropdown-menu/list-items';
import { HtmlLink, StyledNavItem } from '../dropdown-menu/list-items/nav-item';
import { StyledExternalLink } from '../dropdown-menu/list-items/external-item';
import { DropdownMenuButton, StyledDropdownMenu } from '../dropdown-menu-button/dropdown-menu-button';
import { Icon } from '../icon/icon';
import { useTranslation } from '../../i18n/use-translation';
import { StyledHeading } from '../dropdown-menu/list-items/group-item';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

const StyledDropdownMenuButton = styled(DropdownMenuButton)`
    ${StyledDropdownMenu} {
        border-radius: var(--border-radius-2x);
        box-sizing: border-box;
        max-width: 384px;
        min-width: 200px;
        padding: var(--spacing-3x) 0;
        right: 0;
        width: initial;

        ${StyledNavItem}, ${HtmlLink} {
            height: 2.75rem;
            padding: var(--spacing-1x) var(--spacing-4x);
        }

        ${StyledExternalLink} {
            line-height: 1.5rem;
            padding: var(--spacing-half) var(--spacing-4x);
        }

        ${StyledHeading} {
            margin: 0;
            margin-bottom: var(--spacing-1x);
            padding: 0 var(--spacing-4x);
        }

        ul:not(:last-child)::after,
        ol:not(:last-child)::after {
            border-bottom: 1px solid ${({ theme }) => theme.greys.grey};
            content: "";
            display: block;
            margin: var(--spacing-2x) var(--spacing-4x);
            margin-bottom: var(--spacing-3x);
        }
    }
`;

interface BentoMenuButtonProps {
    productLinks: NavItemProps[];
    externalLinks: ExternalItemProps[];
}

export const BentoMenuButton: FunctionComponent<BentoMenuButtonProps> = ({
    productLinks,
    externalLinks,
}) => {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('bento');
    const firstItemRef = useRef<HTMLAnchorElement>(null);
    return (
        <StyledDropdownMenuButton
            render={(close) => (
                <>
                    <GroupItem label={t('productsLabel')} id="product-links">
                        {productLinks.map((product, idx) => (
                            <NavItem
                                ref={idx === 0 ? firstItemRef : undefined}
                                target="_blank"
                                data-testid={`product-${product.value}`}
                                key={`product-${product.value}`}
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
                                    close();
                                }}
                            />
                        ))}
                    </GroupItem>
                    <GroupItem label={t('externalsLabel')} id="external-links">
                        {externalLinks.map((external) => (
                            <ExternalItem
                                data-testid={`external-${external.label}`}
                                key={`external-${external.label}`}
                                href={external.href}
                                label={external.label}
                                disabled={external.disabled}
                                onClick={external.disabled ? undefined : () => {
                                    external.onClick?.();
                                    close();
                                }}
                            />
                        ))}
                    </GroupItem>
                </>
            )}
            hasCaret={false}
            icon={<Icon name="bento" size={isMobile ? '24' : '16'} />}
            firstItemRef={firstItemRef}
        />
    );
};
