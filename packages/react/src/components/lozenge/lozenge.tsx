import { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Theme } from '../../themes';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';

const MAXIMUM_LENGTH = '312px';

export type LozengeType = 'default' | 'success' | 'alert' | 'warning' | 'info' | 'disabled';

interface StyledLozengeProps {
    $isMobile: boolean;
    $type?: LozengeType;
    theme: Theme;
}

function getLozengeBackgroundColor({ $type, theme }: StyledLozengeProps): string {
    switch ($type) {
        case 'success':
            return theme.ref['color-success-05'];
        case 'disabled':
            return theme.ref['color-neutral-05'];
        case 'alert':
            return theme.ref['color-alert-05'];
        case 'warning':
            return theme.ref['color-warning-05'];
        case 'info':
            // TODO: add this color in default themes
            return theme.ref['color-discovery-02'];
        case 'default':
        default:
            return theme.ref['color-neutral-05'];
    }
}

function getLozengeBorderColor({ $type, theme }: StyledLozengeProps): string {
    switch ($type) {
        case 'success':
            return theme.ref['color-success-50'];
        case 'disabled':
            return theme.ref['color-neutral-30'];
        case 'alert':
            return theme.ref['color-alert-50'];
        case 'warning':
            return theme.ref['color-warning-50'];
        case 'info':
            return theme.ref['color-informative-50'];
        case 'default':
        default:
            return theme.ref['color-neutral-65'];
    }
}

function getLozengeColor({ $type, theme }: StyledLozengeProps): string {
    switch ($type) {
        case 'success':
            return theme.ref['color-success-50'];
        case 'disabled':
            return theme.ref['color-neutral-30'];
        case 'alert':
            return theme.ref['color-alert-50'];
        case 'warning':
            return theme.ref['color-warning-50'];
        case 'info':
            return theme.ref['color-informative-50'];
        case 'default':
        default:
            return theme.ref['color-neutral-65'];
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
