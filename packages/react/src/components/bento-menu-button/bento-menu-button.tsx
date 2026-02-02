/* eslint-disable react/jsx-props-no-spreading */
import { FunctionComponent, PropsWithChildren, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { DropdownMenuButton, StyledDropdownMenu } from '../dropdown-menu-button/dropdown-menu-button';
import { ExternalItem, ExternalItemProps, GroupItem, NavItemProps } from '../dropdown-menu/list-items';
import { StyledExternalLink } from '../dropdown-menu/list-items/external-item';
import { StyledHeading } from '../dropdown-menu/list-items/group-item';
import { HtmlLink, StyledNavItem } from '../dropdown-menu/list-items/nav-item';
import { Icon } from '../icon/icon';
import { ProductGroup, ProductGroupProps } from './product-group';

const StyledDropdownMenuButton = styled(DropdownMenuButton)`
    ${StyledDropdownMenu} {
        border-radius: var(--border-radius-2x);
        box-sizing: border-box;
        max-width: 350px;
        min-width: 200px;
        padding: var(--spacing-1halfx) 0;
        right: 0;
        width: initial;

        ${StyledNavItem},
        ${HtmlLink} {
            height: 2rem;
            overflow: visible;
            padding: var(--spacing-1x) var(--spacing-2x);
        }

        ${StyledExternalLink} {
            line-height: 1.5rem;
            padding: var(--spacing-half) var(--spacing-2x);
        }

        ${StyledHeading} {
            margin: 0 0 var(--spacing-1x);
            padding: 0 var(--spacing-2x);
        }

        ul:not(:last-child)::after,
        ol:not(:last-child)::after {
            border-bottom: 1px solid ${({ theme }) => theme.component['bento-menu-separator-color']};
            content: '';
            display: block;
            margin: var(--spacing-1x) var(--spacing-2x);
        }
    }
`;

interface BentoMenuButtonProps {
    ariaLabel?: string;
    buttonAriaLabel?: string;
    externalLinks: ExternalItemProps[];
    inverted?: boolean;
    /** Set wrapper element tag */
    tag?: 'div' | 'nav';
    onMenuVisibilityChanged?(isOpen: boolean): void;
    productGroups?: ProductGroupProps[];
    productLinks?: NavItemProps[];
    title?: string,
}

export const BentoMenuButton: FunctionComponent<PropsWithChildren<BentoMenuButtonProps>> = ({
    ariaLabel,
    buttonAriaLabel,
    externalLinks,
    inverted = true,
    tag,
    onMenuVisibilityChanged,
    productGroups,
    productLinks,
    title,
}) => {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('bento');
    const firstItemRef = useRef<HTMLAnchorElement>(null);
    if (productGroups && productLinks) {
        throw new Error('invalid props. bento-menu-button cannot have both productLinks and productGroups.');
    }

    let productLinkGroups = productGroups ?? [];
    if (productLinks && !productGroups) {
        if (productLinks.length > 0) {
            productLinkGroups = [{
                label: t('productsLabel'),
                name: 'product',
                productLinks,
            }];
        }
    }

    return (
        <StyledDropdownMenuButton
            render={(close) => (
                <>
                    {productLinkGroups.length > 0 && (
                        productLinkGroups.map((productLinkGroup) => (
                            <ProductGroup
                                firstItemRef={firstItemRef}
                                label={productLinkGroup.label}
                                name={productLinkGroup.name}
                                onClick={close}
                                productLinks={productLinkGroup.productLinks}
                            />
                        ))
                    )}
                    {externalLinks.length > 0 && (
                        <GroupItem label={t('externalsLabel')} id="external-links" data-testid="resources-group">
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
                    )}
                </>
            )}
            ariaLabel={ariaLabel}
            buttonAriaLabel={buttonAriaLabel}
            tag={tag}
            title={title}
            hasCaret={false}
            icon={<Icon name="bento" size={isMobile ? '24' : '16'} />}
            buttonType="tertiary"
            inverted={inverted}
            firstItemRef={firstItemRef}
            onMenuVisibilityChanged={onMenuVisibilityChanged}
        />
    );
};

BentoMenuButton.displayName = 'BentoMenuButton';
