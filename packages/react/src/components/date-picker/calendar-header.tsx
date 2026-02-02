import { getMonth, getYear } from 'date-fns';
import { VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { IconButton } from '../buttons/icon-button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { DropdownList } from '../dropdown-list/dropdown-list';
import { DropdownListOption } from '../dropdown-list/dropdown-list-option';

const Wrapper = styled.div<{ isMobile: boolean }>`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: ${({ isMobile }) => (isMobile ? '0 var(--spacing-1x) var(--spacing-3x)' : '0 0 var(--spacing-3x)')};

    > button {
        height: var(--size-2x);
        width: var(--size-2x);

        &:focus {
            outline: none;
        }
    }
`;

const StyledButton = styled(IconButton)`
    border-radius: var(--border-radius);
    &:focus {
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
                buttonType="tertiary"
                iconName="chevronLeft"
                type="button"
            />
            <FlexContainer>
                <DropdownListWrapper isMobile={isMobile} style={{ marginRight: '8px' }}>
                    <DropdownList
                        ariaLabel={t('monthSelectLabel')}
                        data-testid="month-select"
                        options={monthsOptions}
                        onChange={(options: DropdownListOption) => {
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
                        onChange={(options: DropdownListOption) => {
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
                buttonType="tertiary"
                iconName="chevronRight"
                type="button"
            />
        </Wrapper>
    );
};

CalendarHeader.displayName = 'CalendarHeader';
