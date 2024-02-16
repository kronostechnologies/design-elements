import { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ResolvedTheme } from '../../themes/theme';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';

const MAXIMUM_LENGTH = '312px';

export type LozengeType = 'default' | 'success' | 'alert' | 'warning' | 'info' | 'disabled';

interface StyledLozengeProps {
    $isMobile: boolean;
    $type?: LozengeType;
    theme: ResolvedTheme;
}

function getLozengeBackgroundColor({ $type, theme }: StyledLozengeProps): string {
    switch ($type) {
        case 'success':
            return theme.component['lozenge-success-background-color'];
        case 'disabled':
            return theme.component['lozenge-disabled-background-color'];
        case 'alert':
            return theme.component['lozenge-alert-background-color'];
        case 'warning':
            return theme.component['lozenge-warning-background-color'];
        case 'info':
            return theme.component['lozenge-info-background-color'];
        case 'default':
        default:
            return theme.component['lozenge-default-background-color'];
    }
}

function getLozengeBorderColor({ $type, theme }: StyledLozengeProps): string {
    switch ($type) {
        case 'success':
            return theme.component['lozenge-success-border-color'];
        case 'disabled':
            return theme.component['lozenge-disabled-border-color'];
        case 'alert':
            return theme.component['lozenge-alert-border-color'];
        case 'warning':
            return theme.component['lozenge-warning-border-color'];
        case 'info':
            return theme.component['lozenge-info-border-color'];
        case 'default':
        default:
            return theme.component['lozenge-default-border-color'];
    }
}

function getLozengeColor({ $type, theme }: StyledLozengeProps): string {
    switch ($type) {
        case 'success':
            return theme.component['lozenge-success-color'];
        case 'disabled':
            return theme.component['lozenge-disabled-color'];
        case 'alert':
            return theme.component['lozenge-alert-color'];
        case 'warning':
            return theme.component['lozenge-warning-color'];
        case 'info':
            return theme.component['lozenge-info-color'];
        case 'default':
        default:
            return theme.component['lozenge-default-color'];
    }
}

const StyledLozenge = styled.div<StyledLozengeProps>`
    align-items: center;
    background-color: ${getLozengeBackgroundColor};
    border: 1px solid ${getLozengeBorderColor};
    border-radius: ${({ $isMobile }) => ($isMobile ? 'var(--border-radius)' : 'var(--border-radius-half)')};
    box-sizing: border-box;
    color: ${getLozengeColor};
    display: inline-flex;
    font-size: ${({ $isMobile }) => ($isMobile ? '0.875rem' : '0.75rem')};
    font-weight: var(--font-normal);
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

interface Props {
    className?: string;
    type?: LozengeType;
    icon?: IconName;
}

export const Lozenge: FunctionComponent<PropsWithChildren<Props>> = ({
    children,
    className,
    icon,
    type,
}) => {
    const { isMobile } = useDeviceContext();
    return (
        <StyledLozenge
            $type={type}
            className={className}
            $isMobile={isMobile}
        >
            {icon && (
                <StyledIcon
                    data-testid="lozenge-icon"
                    name={icon}
                    size={isMobile ? '16' : '12'}
                    $isMobile={isMobile}
                />
            )}
            <TagLabel>
                {children}
            </TagLabel>
        </StyledLozenge>
    );
};
