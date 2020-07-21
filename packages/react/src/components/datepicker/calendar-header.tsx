import { getMonth, getYear } from 'date-fns';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';
import { Option, Select } from '../select/select';

const Wrapper = styled.div<{ isMobile: boolean }>`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: ${({ isMobile }) => isMobile ? '0 var(--spacing-1x) var(--spacing-3x)' : '0 0 var(--spacing-3x)' };

    > button {
        background-color: ${({ theme }) => theme.greys.white};
        border: none;
        display: flex;
        padding: 0;

        &:focus {
            outline: none;
        }

        &:hover {
            cursor: pointer;
        }
    }
`;

const FlexContainer = styled.div`
    display: flex;
`;

const SelectWrapper = styled.div<{ isMobile: boolean }>`
    height: ${({ isMobile }) => isMobile ? 40 : 32}px;
    width: ${({ isMobile }) => isMobile ? 88 : 80}px;
`;

interface CalendarHeaderProps {
    date: Date;
    months: string[];
    monthsOptions: Option[];
    nextMonthButtonDisabled: boolean;
    nextYearButtonDisabled: boolean;
    prevMonthButtonDisabled: boolean;
    prevYearButtonDisabled: boolean;
    yearsOptions: Option[];
    changeMonth(month: number): void;
    changeYear(year: number): void;
    decreaseMonth(): void;
    decreaseYear(): void;
    increaseMonth(): void;
    increaseYear(): void;
}

export function CalendarHeader({
    changeMonth,
    changeYear,
    date,
    decreaseMonth,
    increaseMonth,
    months,
    monthsOptions,
    nextMonthButtonDisabled,
    prevMonthButtonDisabled,
    yearsOptions,
}: CalendarHeaderProps): ReactElement {
    const { t } = useTranslation('datepicker');
    const { isMobile } = useDeviceContext();

    return (
        <Wrapper isMobile={isMobile}>
            <button
                aria-label={t('monthPreviousButtonLabel')}
                data-testid="month-previous"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
            >
                <Icon name="chevronLeft" size={isMobile ? '26' : '16'} />
            </button>
            <FlexContainer>
                <SelectWrapper isMobile={isMobile} style={{ marginRight: '8px' }}>
                    <Select
                        data-testid="month-select"
                        options={monthsOptions}
                        onChange={options => {
                            changeMonth(months.indexOf(options.label));
                        }}
                        value={monthsOptions[getMonth(date)].value}
                    />
                </SelectWrapper>
                <SelectWrapper isMobile={isMobile}>
                    <Select
                        data-testid="year-select"
                        options={yearsOptions}
                        onChange={options => {
                            changeYear(parseInt(options.value, 10));
                        }}
                        value={getYear(date).toString()}
                    />
                </SelectWrapper>
            </FlexContainer>
            <button
                aria-label={t('monthNextButtonLabel')}
                data-testid="month-next"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
            >
                <Icon name="chevronRight" size={isMobile ? '24' : '16'} />
            </button>
        </Wrapper>
    );
}
