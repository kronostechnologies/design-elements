import { getMonth, getYear } from 'date-fns';
import { enCA, enUS, frCA } from 'date-fns/locale';
import React, { ChangeEvent, FocusEvent, ReactElement, useMemo, useRef, useState } from 'react';
import DatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
// tslint:disable-next-line:no-import-side-effect
import 'react-datepicker/dist/react-datepicker.min.css';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { Icon } from '../icon/icon';
import { Select } from '../select/select';
import { Theme } from '../theme-wrapper/theme-wrapper';
import {
    getLocale,
    getLocaleDateFormat,
    getLocaleDatePlaceholder,
    getLocaleMonthsOptions,
    getLocaleMonthsShort,
    getYearsOptions,
} from './utils/datepicker-utils';

const Container = styled.div`
    align-items: center;
    display: flex;

    .popper {
        &[data-placement^="bottom"] {
            margin-top: 0;
        }
    }

    .customHeader {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding-bottom: var(--spacing-2x);

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
    }

    .react-datepicker__header {
        background-color: ${({ theme }) => theme.greys.white};
        border-bottom: none;
        margin-bottom: 2px;
        padding: 0;
    }

    .react-datepicker__month {
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
                background-color: ${({ theme }) => theme.greys.grey};
                border-radius: 20px;
            }

            &:focus {
                outline: none;
            }
        }

        .react-datepicker__day--outside-month {
            color: ${({ theme }) => theme.greys['dark-grey']};

            &.react-datepicker__day--selected {
                color: ${({ theme }) => theme.greys.white};
            }
        }

        .react-datepicker__day--disabled {
            color: ${({ theme }) => theme.greys['mid-grey']};

            &:hover {
                background-color: ${({ theme }) => theme.greys.white};
            }
        }

        .react-datepicker__day--keyboard-selected {
            background-color: ${({ theme }) => theme.greys.white};
            border: 1px solid ${({ theme }) => theme.main['primary-1.1']};
            border-radius: 20px;
            box-shadow: 0 0 0 2px rgba(0, 128, 165, 0.4);
            box-sizing: border-box;
            color: ${({ theme }) => theme.greys.black};

            &.react-datepicker__day--today {
                color: ${({ theme }) => theme.main['primary-1.1']} !important;
            }
        }

        .react-datepicker__day--today {
            color: ${({ theme }) => theme.main['primary-1.1']};
            font-weight: var(--font-normal);

            &.react-datepicker__day--keyboard-selected {
                color: ${({ theme }) => theme.greys.black};
            }

            &.react-datepicker__day--selected {
                color: ${({ theme }) => theme.greys.white};
            }
        }

        .react-datepicker__day--selected {
            background-color: ${({ theme }) => theme.main['primary-1.1']};
            border-radius: 20px;
        }
    }

    .react-datepicker__day-name {
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
            height: 40px;
            line-height: 2.5rem;
            width: 40px;
        }

        .react-datepicker__month {
            font-size: 1rem;
        }
    }

    .react-datepicker {
        border: 1px solid ${({ theme }) => theme.greys.grey};
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.19);
        font-family: 'Open Sans', sans-serif;
        padding: var(--spacing-3x) var(--spacing-2x);
    }
`;

const StyledDatePicker = styled(DatePicker)<StyledDatePickerProps>`
    &.datePicker {
        background-color: ${({ disabled, theme }) => disabled ? theme.greys['light-grey'] : theme.greys.white};
        border: 1px solid ${({ disabled, theme, valid }) => getInputBorderColor(theme, disabled, valid)};
        border-radius: var(--border-radius) 0 0 var(--border-radius);
        box-sizing: border-box;
        font-family: inherit;
        font-size: ${({ withPortal }) => withPortal ? '1rem' : '0.875rem'};
        height: ${({ withPortal }) => withPortal ? '40px' : '32px'};
        padding: var(--spacing-half) 0 var(--spacing-half) var(--spacing-1x);
        width: ${({ isMobile }) => isMobile ? 113 : 109}px;

        &::placeholder {
            ${({ disabled, theme }) => disabled ? `color: ${theme.greys['mid-grey']};` : ''}
        }

        &:focus {
            border: 1px solid ${({ theme, valid }) => valid ? theme.main['primary-1.1'] : theme.notifications['error-2.1']};
            outline: none;
        }
    }
`;

const SelectWrapper = styled.div`
    height: 32px;
    width: 80px;
`;

const SideIcon = styled.button<SideIconProps>`
    align-items: center;
    background-color: ${({ disabled, theme }) => disabled ? theme.greys['light-grey'] : theme.greys.white};
    border: 1px solid ${({ disabled, theme }) => disabled ? theme.greys.grey : theme.greys['dark-grey']};
    border-left: none;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    box-sizing: border-box;
    color: ${({ disabled, theme }) => disabled ? theme.greys['mid-grey'] : theme.greys['dark-grey']};
    cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
    display: flex;
    height: ${({ isMobile }) => isMobile ? '40px' : '32px'};
    justify-content: center;
    width: ${({ isMobile }) => isMobile ? '40px' : '32px'};

    &:hover {
        background-color: ${({ disabled, theme }) => disabled ? 'none' : theme.greys.grey};
    }

    &:focus {
        outline: none;
    }
`;

export type LocaleProps = 'fr-CA' | 'en-CA' | 'en-US';

interface StyledDatePickerProps extends ReactDatePickerProps {
    isMobile: boolean;
    theme: Theme;
    valid?: boolean;
}

interface SideIconProps {
    disabled?: boolean;
    theme: Theme;
    isMobile?: boolean;
}

interface DatepickerProps {
    /** Sets date format (e.g.: dd/MM/yyyy). */
    dateFormat?: string;
    disabled?: boolean;
    id?: string;
    /** Sets input label */
    label?: string;
    /**
     * Sets localization
     * @default en-CA
     */
    locale?: LocaleProps;
    maxDate?: Date | null;
    minDate?: Date | null;
    /** Sets input name */
    name?: string;
    /** Toggles calendar (controlled) */
    open?: boolean;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    /** Sets default selected date */
    startDate?: Date | null;
    /** Sets calendar initially open (uncontrolled) */
    startOpen?: boolean;
    tabIndex?: number;
    /**
     * Sets input validity
     * @default true
     */
    valid?: boolean;
    /** Sets error message */
    validationErrorMessage?: string;
    /** Sets input value (controlled) */
    value?: string;

    onBlur?(event: FocusEvent<HTMLInputElement>): void;
    onChange?(date: Date, event: ChangeEvent<HTMLInputElement>): void;
    onFocus?(event: FocusEvent<HTMLInputElement>): void;
}

registerLocale('en-CA', enCA);
registerLocale('en-US', enUS);
registerLocale('fr-CA', frCA);

export function Datepicker({
    dateFormat,
    disabled,
    label,
    locale = 'en-CA',
    maxDate,
    minDate,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    startDate,
    valid = true,
    validationErrorMessage,
    ...props
}: DatepickerProps): ReactElement {
    const { t } = useTranslation('datepicker');
    const localeArray = [enUS, enCA, frCA];
    const { isMobile } = useDeviceContext();
    const [selectedDate, setSelectedDate] = useState(startDate);
    const currentLocale = useMemo(() => getLocale(localeArray, locale), [locale]);
    const months = useMemo(() => getLocaleMonthsShort(currentLocale), [currentLocale]);
    const monthsOptions = useMemo(() => getLocaleMonthsOptions(currentLocale), [currentLocale]);
    const yearsOptions = useMemo(() => getYearsOptions(minDate, maxDate), [minDate, maxDate]);
    const id = useMemo(uuid, []);
    const dateInput = useRef<DatePicker>(null);

    const handleClick = () => {
        if (dateInput.current !== null) {
            dateInput.current.props.open ? dateInput.current.setBlur() : dateInput.current.setFocus();
        }
    };

    const handleChange = (date: Date, event: ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(date);
        if (onChange) onChange(date, event);
    };

    const getPlaceholder = () => {
        if (placeholder) {
            return placeholder;
        } else if (dateFormat) {
            return dateFormat.toUpperCase();
        } else {
            return getLocaleDatePlaceholder(locale);
        }
    };

    return (
        <FieldContainer
            fieldId={id}
            label={label || t('label')}
            valid={valid}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
        >
            <Container>
                <StyledDatePicker
                    isMobile={isMobile}
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
                            <button data-testid="month-back" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                <Icon name="chevronLeft" size={isMobile ? '26' : '20'} />
                            </button>
                            <SelectWrapper>
                                <Select
                                    data-testid="month-select"
                                    options={monthsOptions}
                                    onChange={options => {
                                        changeMonth(months.indexOf(options.label));
                                    }}
                                    value={monthsOptions[getMonth(date)].value}
                                />
                            </SelectWrapper>
                            <SelectWrapper>
                                <Select
                                    data-testid="year-select"
                                    options={yearsOptions}
                                    onChange={options => {
                                        changeYear(parseInt(options.value, 10));
                                    }}
                                    value={getYear(date).toString()}
                                />
                            </SelectWrapper>
                            <button
                                data-testid="month-forward"
                                onClick={increaseMonth}
                                disabled={nextMonthButtonDisabled}
                            >
                                <Icon name="chevronRight" size={isMobile ? '26' : '20'} />
                            </button>
                        </div>
                    )}
                    className="datePicker"
                    dateFormat={dateFormat || getLocaleDateFormat(locale)}
                    disabled={disabled}
                    locale={locale}
                    maxDate={maxDate}
                    minDate={minDate}
                    onChange={handleChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    placeholderText={getPlaceholder()}
                    popperClassName="popper"
                    selected={selectedDate}
                    showPopperArrow={false}
                    valid={valid}
                    withPortal={isMobile}
                    {...props}
                />
                <SideIcon disabled={disabled} isMobile={isMobile} onMouseDown={handleClick} className="sideIcon">
                    <Icon name="calendar" size={isMobile ? '24' : '16'} />
                </SideIcon>
            </Container>
        </FieldContainer>
    );
}

function getInputBorderColor(theme: Theme, disabled?: boolean,  valid?: boolean): string {
    if (disabled) {
        return theme.greys.grey;
    } else if (valid) {
        return theme.greys['dark-grey'];
    } else {
        return theme.notifications['error-2.1'];
    }
}
