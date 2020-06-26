import React, { FocusEvent, ReactElement, useRef, useState } from 'react';

import { getMonth, getYear, Locale } from 'date-fns';
import { range } from 'lodash';
import moment from 'moment';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
// tslint:disable-next-line:no-import-side-effect
import 'react-datepicker/dist/react-datepicker.min.css';
import styled from 'styled-components';

import { Icon } from '../icon/icon';
import { Select } from '../select/select';
import { Theme } from '../theme-wrapper/theme-wrapper';

const StyledLabel = styled.label<{withPortal?: boolean}>`
    display: inline-block;
    font-size: ${props => props.withPortal ? '0.875rem' : '0.75rem'};
    margin-bottom: 6px;
    text-transform: capitalize;
`;

const Container = styled.div`
    align-items: center;
    display: flex;

    .datePicker {
        box-sizing: border-box;
    }

    .popper {
        &[data-placement^="bottom"] {
            margin-top: 0;
        }
    }

    .customHeader {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 0 0 var(--spacing-2x) 0;

        > button {
            background-color: ${props => props.theme.greys.white};
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
    }

    .react-datepicker__header {
        background-color: ${props => props.theme.greys.white};
        border-bottom: none;
        padding: 0;
    }

    .react-datepicker__month {
        font-family: 'Open Sans', sans-serif;
        font-size: 0.875rem;
        margin: 0;

        .react-datepicker__day {
            border: 1px solid transparent;
            box-sizing: border-box;
            height: 32px;
            line-height: 2rem;
            margin: 0;
            width: 32px;

            &:hover {
                background-color: ${props => props.theme.greys.grey};
                border-radius: 24px;
            }

            &:focus {
                outline: none;
            }
        }

        .react-datepicker__day--outside-month {
            color: ${props => props.theme.greys['dark-grey']};

            &.react-datepicker__day--selected {
                color: ${props => props.theme.greys.white};
            }
        }

        .react-datepicker__day--disabled {
            color: ${props => props.theme.greys['mid-grey']};

            &:hover {
                background-color: ${props => props.theme.greys.white};
            }
        }

        .react-datepicker__day--keyboard-selected {
            background-color: ${({ theme }) => theme.greys.white};
            border: 1px solid ${props => props.theme.main['primary-1.1']};
            border-radius: 16px;
            box-shadow: 0 0 0 2px rgba(0, 128, 165, 0.4);
            box-sizing: border-box;
            color: ${props => props.theme.greys.black};

            &.react-datepicker__day--today {
                color: ${props => props.theme.main['primary-1.1']} !important;
            }
        }

        .react-datepicker__day--today {
            color: ${props => props.theme.main['primary-1.1']};
            font-weight: 400;

            &.react-datepicker__day--keyboard-selected {
                color: ${props => props.theme.greys.black};
            }

            &.react-datepicker__day--selected {
                color: ${props => props.theme.greys.white};
            }
        }

        .react-datepicker__day--selected {
            background-color: ${props => props.theme.main['primary-1.1']};
            border-radius: 24px;
        }
    }

    .react-datepicker__day-name {
        font-family: 'Open Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: var(--font-bold);
        text-transform: uppercase;
    }

    .react-datepicker__portal {
        .customHeader {
            padding: 0 var(--spacing-1x) var(--spacing-3x);
        }

        .react-datepicker__day-name {
            font-size: 1rem;
            line-height: 2.25rem;
            width: 35px;
        }

        .react-datepicker__day {/* stylelint-disable-line */
            line-height: 2.5rem;
            width: 40px;
        }

        .react-datepicker__month {
            font-size: 1rem;
        }
    }

    .react-datepicker {
        border: 1px solid ${props => props.theme.greys.grey};
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.19);
        font-family: 'Open Sans', sans-serif;
        padding: var(--spacing-3x) var(--spacing-2x);
    }
`;

interface StyledDatePickerProps extends ReactDatePickerProps {
    theme: Theme;
    valid?: boolean;
}

const StyledDatePicker = styled(DatePicker)<StyledDatePickerProps>`
    &.datePicker {
        background-color: ${props => props.disabled ? props.theme.greys['light-grey'] : props.theme.greys.white};
        border: 1px solid ${props => props.disabled ? props.theme.greys.grey : props.valid ? props.theme.greys['dark-grey'] : props.theme.notifications['error-2.1']};
        border-radius: var(--border-radius) 0 0 var(--border-radius);
        font-family: inherit;
        font-size: ${props => props.withPortal ? '1rem' : '0.875rem'};
        height: ${props => props.withPortal ? '40px' : '32px'};
        padding: var(--spacing-half) 0 var(--spacing-half) var(--spacing-1x);
        width: 109px;

        &::placeholder {
            ${props => props.disabled ? `color: ${props.theme.greys['mid-grey']};` : ''}
        }

        &:focus {
            border: 1px solid ${props => props.valid ? props.theme.main['primary-1.1'] : props.theme.notifications['error-2.1']};
            outline: none;
        }
    }
`;

const SelectWrapper = styled.div`
    height: 32px;
    width: 80px;
`;

interface SideIconProps {
    disabled?: boolean;
    theme: Theme;
    withPortal?: boolean;
}

const SideIcon = styled.button<SideIconProps>`
    align-items: center;
    background-color: ${props => props.disabled ? props.theme.greys['light-grey'] : props.theme.greys.white};
    border: 1px solid ${props => props.disabled ? props.theme.greys.grey : props.theme.greys['dark-grey']};
    border-left: none;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    color: ${props => props.disabled ? props.theme.greys['mid-grey'] : props.theme.greys['dark-grey']};
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    display: flex;
    height: ${props => props.withPortal ? '40px' : '32px'};
    justify-content: center;
    width: ${props => props.withPortal ? '40px' : '32px'};

    &:hover {
        background-color: ${props => props.disabled ? 'none' : props.theme.greys.grey};
    }

    &:focus {
        outline: none;
    }
`;

interface ErrorLabelProps {
    children: string | undefined;
    theme: Theme;
    valid?: boolean;
}

const ErrorLabel = styled.label<ErrorLabelProps>`
    color: ${props => props.theme.notifications['error-2.1']};
    display: ${(props: {children: string | undefined, valid?: boolean, theme: Theme}) => props.valid ? 'none' : 'inline-block'};
    font-size: 0.75rem;
    margin-top: var(--spacing-half);
`;

interface LocaleProps extends Locale {
    code?: string;
}

interface DatepickerProps {
    /**
     * Disables input
     */
    disabled?: boolean;
    id?: string;
    /**
     * Sets input label
     */
    label: string;
    /**
     * Sets localization. Currently available: en, es, fr.
     * @default en
     */
    locale?: LocaleProps;
    /**
     * Sets max date
     */
    maxDate?: Date | null;
    /**
     * Sets min date
     */
    minDate?: Date | null;
    name?: string;
    /**
     * Toggles calendar (controlled)
     */
    open?: boolean;
    readOnly?: boolean;
    required?: boolean;
    /**
     * Sets default selected date
     */
    startDate?: Date | null;
    /**
     * Sets calendar initially open (uncontrolled)
     */
    startOpen?: boolean;
    tabIndex?: number;
    /**
     * Sets input validity
     * @default true
     */
    valid?: boolean;
    /**
     * Sets error message
     */
    validationErrorMessage?: string;
    /**
     * Sets input value (controlled)
     */
    value?: string;
    /**
     * Sets portal mode
     */
    withPortal?: boolean;

    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    onChange?(date: Date): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
}

export function Datepicker({
    disabled,
    label,
    locale,
    maxDate,
    minDate,
    onBlur,
    onChange,
    onFocus,
    startDate,
    valid = true,
    validationErrorMessage = 'Invalid date format',
    withPortal,
    ...props
}: DatepickerProps): ReactElement {
    const [selectedDate, setSelectedDate] = useState(startDate);
    const years =
    range(minDate ? getYear(minDate) : 1920, maxDate ? getYear(maxDate) + 1 : getYear(new Date()) + 1, 1);
    const yearsOptions: any[] = [];
    // @ts-ignore
    years.map(year => {
        yearsOptions.push({ value: year.toString(), label: year.toString() });
    });
    locale && moment.locale(locale.code);
    const months = moment.monthsShort();
    const monthsOptions: any[] = [];
    // @ts-ignore
    months.map(month => {
        monthsOptions.push({
            value: month.toLowerCase(),
            label: month.charAt(0).toUpperCase() + month.substring(0, 3).slice(1),
        });
    });

    const dateInput = useRef<DatePicker>(null);

    const handleClick = () => {
        if (dateInput.current !== null) {
            dateInput.current.props.open ? dateInput.current.setBlur() : dateInput.current.setFocus();
        }
    };

    const handleChange = (date: Date) => {
        setSelectedDate(date);
        if (onChange) onChange(date);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        if (onBlur) onBlur(event);
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        if (onFocus) onFocus(event);
    };

    return (
    <>
    <StyledLabel withPortal={withPortal}>{label}</StyledLabel>
    <Container>
        <StyledDatePicker
            ref={dateInput}
            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
            }) => (
                <div className="customHeader">
                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                    <Icon name="chevronLeft" size={withPortal ? '26' : '20'} />
                </button>
                <SelectWrapper>
                    <Select
                        options={monthsOptions}
                        onChange={options => {
                            changeMonth(months.indexOf(options.label));
                        }}
                        value={months[getMonth(date)].toLowerCase()}
                    />
                </SelectWrapper>
                <SelectWrapper>
                    <Select
                        options={yearsOptions}
                        onChange={options => {
                            changeYear(parseInt(options.value, 10));
                        }}
                        value={getYear(date).toString()}
                    />
                </SelectWrapper>
                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                    <Icon name="chevronRight" size={withPortal ? '26' : '20'} />
                </button>
                </div>
            )}
            className="datePicker"
            dateFormat="yyyy-MM-dd"
            disabled={disabled}
            locale={locale}
            maxDate={maxDate}
            minDate={minDate}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholderText="AAAA-MM-JJ"
            popperClassName="popper"
            selected={selectedDate}
            showPopperArrow={false}
            valid={valid}
            withPortal={withPortal}
            {...props}
        />
        <SideIcon disabled={disabled} withPortal={withPortal} onMouseDown={handleClick} className="sideIcon">
        <Icon name="calendar" size={withPortal ? '20' : '16'} />
        </SideIcon>
    </Container>
    <ErrorLabel valid={valid}>
        {validationErrorMessage}
    </ErrorLabel>
    </>
    );
}
