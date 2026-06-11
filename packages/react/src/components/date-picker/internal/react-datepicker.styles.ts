import { css, type FlattenInterpolation, type ThemeProps } from 'styled-components';
import type { ResolvedTheme } from '../../../themes';
import { focus } from '../../../utils/css-state';

export interface ReactDatepickerStylesProps {
    $isMobile?: boolean;
}

export function reactDatepickerStyles({
    $isMobile,
}: ReactDatepickerStylesProps): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    return css`
        .react-datepicker {
            background-color: ${({ theme }) => theme.component['datepicker-background-color']};
            border: 1px solid ${({ theme }) => theme.component['datepicker-border-color']};
            box-shadow: 0 10px 20px 0 ${({ theme }) => theme.component['datepicker-box-shadow-color']};
            font-family: var(--font-family);
            padding: var(--spacing-3x) var(--spacing-2x);
        }

        .react-datepicker-wrapper {
            width: auto;
        }

        .react-datepicker__day {
            background-color: ${({ theme }) => theme.component['datepicker-day-background-color']};
            border: 1px solid ${({ theme }) => theme.component['datepicker-day-border-color']};
            border-radius: 50%;
            box-sizing: border-box;
            color: ${({ theme }) => theme.component['datepicker-day-text-color']};
            height: var(--size-2x);
            line-height: 1.875rem;
            margin: 0;
            width: var(--size-2x);

            ${focus};

            &:not([aria-disabled='true']):hover {
                background-color: ${({ theme }) => theme.component['datepicker-day-hover-background-color']};
                border-radius: 50%;
            }
        }

        .react-datepicker__day--disabled {
            color: ${({ theme }) => theme.component['datepicker-day-disabled-text-color']};
        }

        .react-datepicker__day--selected {
            background-color: ${({ theme }) => theme.component['datepicker-day-selected-background-color']};
            border: 1px solid ${({ theme }) => theme.component['datepicker-day-selected-border-color']};
            color: ${({ theme }) => theme.component['datepicker-day-selected-text-color']};
            font-weight: var(--font-semi-bold);
        }

        .react-datepicker__day--today {
            color: ${({ theme }) => theme.component['datepicker-day-today-text-color']};
            font-weight: var(--font-semi-bold);

            &.react-datepicker__day--selected {
                color: ${({ theme }) => theme.component['datepicker-day-selected-text-color']};
            }
        }

        .react-datepicker__day-names {
            margin: 0;
        }

        .react-datepicker__day-name {
            font-size: 0.875rem;
            font-weight: var(--font-bold);
            line-height: 1.25rem;
            margin: 0;
            text-transform: uppercase;
            width: var(--size-2x);
        }

        .react-datepicker__day--outside-month {
            color: ${({ theme }) => theme.component['datepicker-day-outside-month-text-color']};

            &.react-datepicker__day--selected {
                background-color: ${({ theme }) => theme.component['datepicker-day-selected-outside-month-background-color']};
                border: 1px solid ${({ theme }) => theme.component['datepicker-day-selected-outside-month-border-color']};
                color: ${({ theme }) => theme.component['datepicker-day-selected-outside-month-text-color']};
            }
        }

        .react-datepicker__header {
            background-color: ${({ theme }) => theme.component['datepicker-header-background-color']};
            border-bottom: none;
            margin-bottom: ${$isMobile ? 'var(--spacing-1x)' : 'var(--spacing-half)'};
            padding: 0;
        }

        .react-datepicker__month {
            font-size: ${$isMobile ? 1 : 0.875}rem;
            margin: 0;
        }

        .react-datepicker__portal {
            background-color: ${({ theme }) => theme.component['datepicker-backdrop-color']};

            .react-datepicker__day-name {
                font-size: 1rem;
                line-height: ${$isMobile ? 2 : 1.5}rem;
                width: ${$isMobile ? 'var(--size-2x)' : 'var(--size-2halfx)'};
            }

            .react-datepicker__day {
                height: ${$isMobile ? 'var(--size-2x)' : 'var(--size-2halfx)'};
                line-height: ${$isMobile ? 2 : 2.5}rem;
                width: ${$isMobile ? 'var(--size-2x)' : 'var(--size-2halfx)'};
            }
        }
    `;
}
