import { getMonth, getYear } from 'date-fns';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';
import { Option, Select } from '../select/select';

const Wrapper = styled.div<{ isMobile: boolean }>`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: ${({ isMobile }) => (isMobile ? '0 var(--spacing-1x) var(--spacing-3x)' : '0 0 var(--spacing-3x)')};

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

const StyledButton = styled.button`
    &:focus {
        border-radius: var(--border-radius);
        box-shadow: ${({ theme }) => theme.tokens['focus-box-shadow']};
    }
`;

const FlexContainer = styled.div`
    display: flex;
`;

const SelectWrapper = styled.div<{ isMobile: boolean }>`
    height: ${({ isMobile }) => (isMobile ? 40 : 32)}px;
    width: ${({ isMobile }) => (isMobile ? 88 : 80)}px;
`;

interface CalendarHeaderProps {
    date: Date;
    months: string[];
    monthsOptions: Option[];
    nextMonthButtonDisabled: boolean;
    prevMonthButtonDisabled: boolean;
    yearsOptions: Option[];

    changeMonth(month: number): void;

    changeYear(year: number): void;

    decreaseMonth(): void;

    increaseMonth(): void;
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
        <Wrapper isMobile={isMobile} data-testid="calendar-header">
            <StyledButton
                aria-label={t('monthPreviousButtonLabel')}
                data-testid="month-previous"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
            >
                <Icon name="chevronLeft" size={isMobile ? '26' : '16'} />
            </StyledButton>
            <FlexContainer>
                <SelectWrapper isMobile={isMobile} style={{ marginRight: '8px' }}>
                    <Select
                        ariaLabel={t('monthSelectLabel')}
                        data-testid="month-select"
                        options={monthsOptions}
                        onChange={(options) => {
                            changeMonth(months.indexOf(options.label));
                        }}
                        value={monthsOptions[getMonth(date)].value}
                    />
                </SelectWrapper>
                <SelectWrapper isMobile={isMobile}>
                    <Select
                        ariaLabel={t('yearSelectLabel')}
                        data-testid="year-select"
                        options={yearsOptions}
                        onChange={(options) => {
                            changeYear(parseInt(options.value, 10));
                        }}
                        value={getYear(date).toString()}
                    />
                </SelectWrapper>
            </FlexContainer>
            <StyledButton
                aria-label={t('monthNextButtonLabel')}
                data-testid="month-next"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
            >
                <Icon name="chevronRight" size={isMobile ? '24' : '16'} />
            </StyledButton>
        </Wrapper>
    );
}
