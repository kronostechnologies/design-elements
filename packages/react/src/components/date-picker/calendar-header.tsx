import { getMonth, getYear } from 'date-fns';
import { VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';
import { DropdownList, DropdownListOption } from '../dropdown-list/dropdown-list';
import { focus } from '../../utils/css-state';

const Wrapper = styled.div<{ isMobile: boolean }>`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: ${({ isMobile }) => (isMobile ? '0 var(--spacing-1x) var(--spacing-3x)' : '0 0 var(--spacing-3x)')};

    > button {
        background-color: ${({ theme }) => theme.component['datepicker-header-nav-button-background-color']};
        border: none;
        height: var(--size-2x);
        padding: 0;
        width: var(--size-2x);

        &:focus {
            outline: none;
        }
    }
`;

const StyledButton = styled.button`
    ${focus}
    &:focus {
        border-radius: var(--border-radius);
        z-index: 10;
    }
`;

const FlexContainer = styled.div`
    display: flex;
`;

const DropdownListWrapper = styled.div<{ isMobile: boolean }>`
    height: ${({ isMobile }) => (isMobile ? 2.5 : 2)}rem;
    width: ${({ isMobile }) => (isMobile ? 5.5 : 5)}rem;
`;

interface CalendarHeaderProps {
    date: Date;
    months: string[];
    monthsOptions: DropdownListOption[];
    nextMonthButtonDisabled: boolean;
    prevMonthButtonDisabled: boolean;
    yearsOptions: DropdownListOption[];

    changeMonth(month: number): void;

    changeYear(year: number): void;

    decreaseMonth(): void;

    increaseMonth(): void;
}

export const CalendarHeader: VoidFunctionComponent<CalendarHeaderProps> = ({
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
}) => {
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
                <DropdownListWrapper isMobile={isMobile} style={{ marginRight: '8px' }}>
                    <DropdownList
                        ariaLabel={t('monthSelectLabel')}
                        data-testid="month-select"
                        options={monthsOptions}
                        onChange={(options) => {
                            changeMonth(months.indexOf(options.label));
                        }}
                        value={monthsOptions[getMonth(date)].value}
                    />
                </DropdownListWrapper>
                <DropdownListWrapper isMobile={isMobile}>
                    <DropdownList
                        ariaLabel={t('yearSelectLabel')}
                        data-testid="year-select"
                        options={yearsOptions}
                        onChange={(options) => {
                            changeYear(parseInt(options.value, 10));
                        }}
                        value={getYear(date).toString()}
                    />
                </DropdownListWrapper>
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
};
