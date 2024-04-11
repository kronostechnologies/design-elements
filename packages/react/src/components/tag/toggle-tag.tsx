import { forwardRef, MouseEventHandler, Ref, SVGProps, useCallback, useState } from 'react';
import styled from 'styled-components';
import { focus } from '../../utils/css-state';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';
import { ToggleTagProps, ToggleTagStylingProps } from './types';
import { getFontSize, getIconSize, getLineHeight, getPadding, isSmall } from './utils';

const TagContainer = styled.button<ToggleTagStylingProps>`
    align-items: center;
    background-color: ${({ theme, $selected }) => ($selected ? theme.component['tag-selected-background-color'] : theme.component['tag-background-color'])};
    border: 1px solid ${({ theme, $selected }) => ($selected ? theme.component['tag-selected-border-color'] : theme.component['tag-border-color'])};
    border-radius: ${({ $tagSize }) => (isSmall($tagSize) ? 'var(--border-radius-2halfx)' : 'var(--border-radius-3x)')};
    display: inline-flex;
    font-family: var(--font-family);
    font-weight: ${({ $selected }) => ($selected ? '600' : '400')};
    padding: ${getPadding};
    padding-left: ${({ $tagSize }) => (isSmall($tagSize) ? 'var(--spacing-1x)' : 'var(--spacing-1halfx)')};
    padding-right: ${({ $tagSize }) => (isSmall($tagSize) ? 'var(--spacing-1x)' : 'var(--spacing-1halfx)')};

    & + & {
        margin-left: var(--spacing-1x);
    }

    ${focus};

    &:hover {
        background-color: ${({ theme, $selected }) => ($selected ? theme.component['tag-selected-background-color'] : theme.component['tag-hover-background-color'])};
        border-color: ${({ theme, $selected }) => ($selected ? theme.component['tag-selected-border-color'] : theme.component['tag-hover-border-color'])};
    }
`;

const TagLabel = styled.span<ToggleTagStylingProps>`
    color: ${({ theme, $selected }) => ($selected ? theme.component['tag-selected-text-color'] : theme.component['tag-text-color'])};
    display: inline-block;
    font-size: ${getFontSize}rem;
    line-height: ${getLineHeight}rem;
    max-width: 312px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
        color: ${({ $selected, theme }) => ($selected ? theme.component['tag-selected-text-color'] : theme.component['tag-hover-text-color'])};
    }
`;

const StyledIcon = styled(Icon)<SVGProps<SVGSVGElement> & ToggleTagStylingProps>`
    color: ${({ theme, $selected }) => ($selected ? theme.component['tag-selected-icon-color'] : theme.component['tag-icon-color'])};
    height: var(--size-1x);
    margin-right: var(--spacing-half);
    vertical-align: text-bottom;
    width: var(--size-1x);

    &:hover {
        color: ${({ $selected, theme }) => ($selected ? theme.component['tag-selected-icon-color'] : theme.component['tag-hover-icon-color'])};
    }
`;

export const ToggleTag = forwardRef(({
    className,
    iconName,
    size = 'medium',
    value,
    selected = undefined,
    onClick,
}: ToggleTagProps, ref: Ref<HTMLButtonElement>) => {
    const { isMobile } = useDeviceContext();

    const hasIcon = !!iconName;
    const hasIconLabel = !(value.label.toLowerCase() === iconName?.toLowerCase());
    const [isSelectedInternal, setSelectedInternal] = useState(selected ?? false);
    const isSelected = selected !== undefined ? selected : isSelectedInternal;

    const handleClick: MouseEventHandler = useCallback(() => {
        if (selected === undefined) {
            setSelectedInternal(!isSelectedInternal);
        }
        onClick?.(value);
    }, [isSelectedInternal, onClick, selected, value]);

    return (
        <TagContainer
            ref={ref}
            className={className}
            onClick={handleClick}
            $isMobile={isMobile}
            $tagSize={size}
            $hasIcon={hasIcon}
            $selected={isSelected}
        >
            {hasIcon && (
                <StyledIcon
                    aria-label={hasIconLabel ? iconName : undefined}
                    aria-hidden={!hasIconLabel}
                    data-testid={`${value.label}-icon`}
                    name={iconName}
                    size={getIconSize(isMobile)}
                    role="img"
                    $isMobile={isMobile}
                    $tagSize={size}
                    focusable
                    $selected={isSelected}
                    $hasIcon={hasIcon}
                />
            )}

            <TagLabel
                $isMobile={isMobile}
                $tagSize={size}
                $selected={isSelected}
                $hasIcon={hasIcon}
            >
                {value.label}
            </TagLabel>
        </TagContainer>
    );
});

ToggleTag.displayName = 'ToggleTag';
