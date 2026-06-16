import { getMonth, getYear, Locale, type Month } from 'date-fns';
import { type FC } from 'react';
import { type ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import styled from 'styled-components';
import { useTranslation } from '../../../../i18n/use-translation';
import { IconButton } from '../../../buttons';
import type { IconButtonProps } from '../../../buttons/icon-button';

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    height: var(--size-1halfx);
    justify-content: space-between;
    padding: 0;
`;

const StyledButton = styled(IconButton)<IconButtonProps & { $hidden: boolean }>`
    border-radius: var(--border-radius);
    height: var(--size-1halfx);
    visibility: ${({ $hidden }) => ($hidden ? 'hidden' : null)};
    width: var(--size-1halfx);
`;

const MonthAndYear = styled.div`
    font-size: 0.875rem;
    font-weight: var(--font-semi-bold);
    text-transform: capitalize;
`;

interface CalendarHeaderProps extends ReactDatePickerCustomHeaderProps {
    locale: Locale;
}

export const CalendarHeader: FC<CalendarHeaderProps> = ({
    customHeaderCount,
    decreaseMonth,
    increaseMonth,
    locale,
    monthDate,
    nextMonthButtonDisabled,
    prevMonthButtonDisabled,
}) => {
    const { t } = useTranslation('filter');
    const month = locale.localize?.month(getMonth(monthDate) as Month);

    return (
        <Wrapper data-testid="calendar-header">
            <StyledButton
                aria-label={t('date.monthPreviousButtonLabel')}
                data-testid="month-previous"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                buttonType="tertiary"
                iconName="chevronLeft"
                type="button"
                $hidden={customHeaderCount !== 0}
            />

            <MonthAndYear>
                {t('date.monthAndYear', { month, year: getYear(monthDate) })}
            </MonthAndYear>

            <StyledButton
                aria-label={t('date.monthNextButtonLabel')}
                data-testid="month-next"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                buttonType="tertiary"
                iconName="chevronRight"
                type="button"
                $hidden={customHeaderCount !== 1}
            />
        </Wrapper>
    );
};

CalendarHeader.displayName = 'CalendarHeader';
