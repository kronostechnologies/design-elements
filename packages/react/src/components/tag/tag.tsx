import {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    MouseEventHandler,
    SVGProps,
    useCallback,
    VoidFunctionComponent,
} from 'react';
import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { Theme } from '../../themes';
import { focus } from '../../utils/css-state';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';

type TagSize = 'small' | 'medium';

export interface TagValue {
    id?: string;
    label: string;
}

export interface TagProps {
    className?: string;
    iconName?: IconName;
    size?: TagSize;
    value: TagValue;

    /** Mutually exclusive with onDelete */
    onClick?(tag: TagValue): void;

    /** Mutually exclusive with onClick */
    onDelete?(tag: TagValue): void;
}

interface ContainerProps {
    $clickable: boolean;
    $deletable: boolean;
    $hasIcon: boolean;
    $isMobile: boolean;
    $tagSize: TagSize;
    type?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>['type'];
}

function getFontSize({ $isMobile }: ContainerProps): number {
    return $isMobile ? 0.875 : 0.75;
}

function getIconSize(isMobile: boolean): string {
    return isMobile ? '20' : '12';
}

function getIconAndButtonWidth({ $deletable, $hasIcon, $isMobile }: ContainerProps): string {
    const sizes = [];
    if ($deletable) {
        sizes.push(`${getIconSize($isMobile)}px`, 'var(--spacing-1x)');
    }
    if ($hasIcon) {
        sizes.push(`${getIconSize($isMobile)}px`);
    }

    return sizes.length > 0 ? sizes.join('+') : '0px';
}

interface IconOrButtonProps {
    $isMobile: boolean;
    $tagSize: TagSize;
}

function isMedium(tagSize: TagSize): tagSize is 'medium' {
    return tagSize === 'medium';
}

function getPadding({ $isMobile, $tagSize }: IconOrButtonProps): string {
    return $isMobile || isMedium($tagSize) ? 'var(--spacing-1x)' : 'var(--spacing-half)';
}

function isSmall(tagSize: TagSize): tagSize is 'small' {
    return tagSize === 'small';
}

function getTagHeight(props: IconOrButtonProps): string {
    let height: string;
    const isSmallTag = isSmall(props.$tagSize);
    if (props.$isMobile) {
        height = isSmallTag ? '24px' : '32px';
    } else {
        height = isSmallTag ? '16px' : '24px';
    }

    return `calc(${height} - ${getPadding(props)} / 2)`;
}

function getLineHeight({ $isMobile, $tagSize }: ContainerProps): number {
    if (isSmall($tagSize)) {
        return $isMobile ? 1.375 : 0.875;
    }
    return $isMobile ? 1.875 : 1.375;
}

function getBorderRadius({ $clickable, $isMobile, $tagSize }: ContainerProps): string {
    if ($clickable) {
        const isSmallTag = isSmall($tagSize);
        if ($isMobile) {
            return isSmallTag ? 'var(--border-radius-3x)' : 'var(--border-radius-4x)';
        }
        return isSmallTag ? 'var(--border-radius-2x)' : 'var(--border-radius-3x)';
    }
    return $isMobile || isMedium($tagSize) ? 'var(--border-radius)' : 'var(--border-radius-half)';
}

const StyledIcon = styled(Icon)<SVGProps<SVGSVGElement> & IconOrButtonProps>`
    /* TODO change when updating thematization */
    color: #60666e;
    display: inline-block;
    height: ${getTagHeight};
    margin-right: var(--spacing-1x);
    vertical-align: middle;
`;

const DeleteIcon = styled(Icon).attrs({
    'aria-hidden': 'true',
    name: 'x',
    color: '#60666e',
})``;

function getClickableStyle({ $clickable }: ContainerProps): FlattenInterpolation<ThemeProps<Theme>> | false {
    return $clickable && css`
        &:hover {
            /* TODO fix with next thematization gray65 */
            background-color: #dbdee1;
            border-color: ${({ theme }) => theme.greys['dark-grey']};
            cursor: pointer;

            ${StyledIcon} {
                color: ${({ theme }) => theme.greys.black};
            }
        }

        ${focus};
    `;
}

const DeleteButton = styled.button<IconOrButtonProps>`
    border-radius: 50%;
    cursor: pointer;
    display: inline-block;
    height: ${getTagHeight};
    margin-bottom: 1px;
    margin-left: var(--spacing-1x);
    padding: var(--spacing-half);
    vertical-align: middle;

    &:hover {
        /* TODO fix with next thematization gray65 */
        background-color: #dbdee1;

        ${DeleteIcon} {
            color: ${({ theme }) => theme.greys.black};
        }
    }

    ${focus};
`;

const MAXIMUM_LENGTH = '312px';
const Container = styled.span<ContainerProps>`
    align-items: center;
    background-color: ${({ theme }) => theme.greys['light-grey']};

    /* TODO fix with next thematization gray50 */
    border: 1px solid #878f9a;
    border-radius: ${getBorderRadius};
    box-sizing: border-box;
    display: inline-block;
    font-size: ${getFontSize}rem;
    line-height: ${getLineHeight}rem;
    max-width: calc(${MAXIMUM_LENGTH} / ${getFontSize} + ${getIconAndButtonWidth});
    overflow: hidden;
    padding: 0 ${getPadding};
    text-overflow: ellipsis;
    white-space: nowrap;

    & + & {
        margin-left: var(--spacing-1x);
    }

    ${DeleteButton} { /* stylelint-disable-line no-descending-specificity */
        margin-right: calc(-1 * var(--spacing-half));
    }

    ${getClickableStyle};

    ${focus};
`;

export const Tag: VoidFunctionComponent<TagProps> = ({
    className,
    iconName,
    onClick,
    onDelete,
    size = 'medium',
    value,
}) => {
    if (onClick && onDelete) {
        throw new Error('Only one of onClick or onDelete can be provided.');
    }

    const { t } = useTranslation('tag');
    const { isMobile } = useDeviceContext();
    const hasIconLabel = !(value.label.toLowerCase() === iconName?.toLowerCase());

    const handleClick: MouseEventHandler = useCallback(() => {
        onClick?.(value);
    }, [onClick, value]);

    const handleDelete: MouseEventHandler = useCallback((e) => {
        e.stopPropagation();
        onDelete?.(value);
    }, [onDelete, value]);

    return (
        <Container
            as={onClick ? 'button' : 'span'}
            className={className}
            onClick={handleClick}
            type={onClick ? 'button' : undefined}
            $isMobile={isMobile}
            $tagSize={size}
            $clickable={!!onClick}
            $deletable={!!onDelete}
            $hasIcon={!!iconName}
        >
            {iconName && (
                <StyledIcon
                    aria-label={hasIconLabel ? iconName : undefined}
                    aria-hidden={!hasIconLabel}
                    data-testid={`${value.label}-icon`}
                    name={iconName}
                    size={getIconSize(isMobile)}
                    role="img"
                    $isMobile={isMobile}
                    $tagSize={size}
                    focusable={undefined}
                />
            )}

            {value.label}

            {onDelete && (
                <DeleteButton
                    data-testid={`${value.label}-delete-button`}
                    type="button"
                    aria-label={t('deleteButtonAriaLabel', { label: value.label })}
                    onClick={handleDelete}
                    $tagSize={size}
                    $isMobile={isMobile}
                >
                    <DeleteIcon size={getIconSize(isMobile)} aria-hidden="true" />
                </DeleteButton>
            )}
        </Container>
    );
};
