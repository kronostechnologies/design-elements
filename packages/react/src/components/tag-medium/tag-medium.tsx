import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { focus } from '../../utils/css-state';
import { useTranslation } from '../../i18n/use-translation';
import { Icon, IconName } from '../icon/icon';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

interface StyledLiProps {
    isMobile: boolean;
}

const StyledLi = styled.li<StyledLiProps>`
    align-items: center;
    background-color: ${({ theme }) => theme.greys['light-grey']};

    /* TODO fix with next thematization gray50 */
    border: 1px solid #878f9a;
    border-radius: var(--border-radius);
    box-sizing: border-box;
    display: flex;
    flex-wrap: nowrap;
    font-size: ${({ isMobile }) => (isMobile ? 0.875 : 0.75)}rem;
    line-height: ${({ isMobile }) => (isMobile ? 1.875 : 1.375)}rem;
    padding: 0 var(--spacing-1x);

    & + & {
        margin-left: var(--spacing-1x);
    }
`;

const StyledIcon = styled(Icon)`
    /* TODO change when updating thematization */
    color: #60666e;
    margin-right: var(--spacing-1x);
`;

const StyledButton = styled.button`
    cursor: pointer;
    display: flex;
    margin-left: var(--spacing-1x);
    ${focus}
`;

export interface ListOption {
    iconName?: IconName;
    label: string;
    focusIndex: number;
    buttonRef: React.RefObject<HTMLButtonElement>
}

interface TagMediumProps {
    option: ListOption;
    onDelete?:(option: ListOption) => void;
}

export function TagMedium({
    option, onDelete,
}: TagMediumProps): ReactElement {
    const { t } = useTranslation('tag-medium');
    const { isMobile } = useDeviceContext();
    const hasIconLabel = !(option.label.toLowerCase() === option.iconName?.toLowerCase());

    return (
        <StyledLi isMobile={isMobile}>
            {/* TODO fix with next thematization gray65 */}
            {option.iconName && (
                <StyledIcon
                    aria-label={hasIconLabel ? option.iconName : undefined}
                    aria-hidden={!hasIconLabel}
                    data-testid={`${option.label}-icon`}
                    name={option.iconName}
                    size={isMobile ? '24' : '16'}
                />
            )}
            {option.label}
            {onDelete && (
                <StyledButton
                    data-testid={`${option.label}-delete-button`}
                    ref={option.buttonRef}
                    type="button"
                    aria-label={t('deleteButtonAriaLabel', { label: option.label })}
                    onClick={() => onDelete(option)}
                >
                    {/* TODO fix with next thematization gray65 */}
                    <Icon aria-hidden="true" name="x" size={isMobile ? '24' : '16'} color="#60666e" />
                </StyledButton>
            )}
        </StyledLi>
    );
}
