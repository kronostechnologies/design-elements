import { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { type ResolvedTheme } from '../../themes';
import { useDeviceContext } from '../device-context-provider';
import { Icon, type IconName } from '../icon';

const MAXIMUM_LENGTH = '312px';

export type LozengeVariant = 'neutral' | 'success' | 'alert' | 'warning' | 'info' | 'discovery';

interface StyledLozengeProps {
    $isMobile: boolean;
    $isSubtle?: boolean;
    $variant: LozengeVariant;
    theme: ResolvedTheme;
}

function getLozengeColor(
    { $variant, $isSubtle, theme }: StyledLozengeProps,
    propertyType: 'background' | 'border' | 'text',
): string {
    const subtleSuffix = $isSubtle ? '-subtle' : '';
    return theme.component[`lozenge-${$variant}${subtleSuffix}-${propertyType}-color`];
}

const StyledLozenge = styled.div<StyledLozengeProps>`
    align-items: center;
    background-color: ${(props) => getLozengeColor(props, 'background')};
    border: 2px solid ${(props) => getLozengeColor(props, 'border')};
    border-radius: ${({ $isMobile }) => ($isMobile ? 'var(--border-radius-2x)' : 'var(--border-radius)')};
    box-sizing: border-box;
    color: ${(props) => getLozengeColor(props, 'text')};
    display: inline-flex;
    font-size: ${({ $isMobile }) => ($isMobile ? '0.875rem' : '0.75rem')};
    font-weight: var(--font-bold);
    line-height: ${({ $isMobile }) => ($isMobile ? '1.375rem' : '0.875rem')};
    max-width: ${MAXIMUM_LENGTH};
    padding: 0 var(--spacing-half);
    text-transform: uppercase;
    width: fit-content;
`;

const TagLabel = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const StyledIcon = styled(Icon)<{ $isMobile: boolean }>`
    height: 0.75rem;
    margin-right: ${({ $isMobile }) => ($isMobile ? 'var(--spacing-1x)' : 'var(--spacing-half)')};
    width: 0.75rem;
`;

export interface LozengeProps {
    className?: string;
    variant?: LozengeVariant;
    icon?: IconName;
    subtle?: boolean;
}

export const Lozenge: FunctionComponent<PropsWithChildren<LozengeProps>> = ({
    children,
    className,
    icon,
    variant = 'neutral',
    subtle = false,
}) => {
    const { isMobile } = useDeviceContext();

    return (
        <StyledLozenge
            $variant={variant}
            className={className}
            $isMobile={isMobile}
            $isSubtle={subtle}
        >
            {icon && (
                <StyledIcon
                    data-testid="lozenge-icon"
                    name={icon}
                    size={isMobile ? '24' : '20'}
                    $isMobile={isMobile}
                />
            )}
            <TagLabel>
                {children}
            </TagLabel>
        </StyledLozenge>
    );
};

Lozenge.displayName = 'Lozenge';
