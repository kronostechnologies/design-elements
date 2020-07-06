import { getMonth, getYear } from 'date-fns';
import { enCA, enUS, frCA } from 'date-fns/locale';
import React, { FocusEvent, ReactElement, useMemo, useRef, useState } from 'react';
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
    getLocaleMonthsOptions,
    getLocaleMonthsShort,
    getYearsOptions,
} from './utils/date-picker-utils';

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
            border-radius: 24px;
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
            height: 40px;
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

const StyledDatePicker = styled(DatePicker)<StyledDatePickerProps>`
    &.datePicker {
        background-color: ${props => props.disabled ? props.theme.greys['light-grey'] : props.theme.greys.white};
        border: 1px solid ${props => props.disabled ? props.theme.greys.grey : props.valid ? props.theme.greys['dark-grey'] : props.theme.notifications['error-2.1']};
        border-radius: var(--border-radius) 0 0 var(--border-radius);
        font-family: inherit;
        font-size: ${props => props.withPortal ? '1rem' : '0.875rem'};
        height: ${props => props.withPortal ? '40px' : '32px'};
        padding: var(--spacing-half) 0 var(--spacing-half) var(--spacing-1x);
        width: ${({ isMobile }) => isMobile ? 113 : 109}px;

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

const SideIcon = styled.button<SideIconProps>`
    align-items: center;
    background-color: ${props => props.disabled ? props.theme.greys['light-grey'] : props.theme.greys.white};
    border: 1px solid ${props => props.disabled ? props.theme.greys.grey : props.theme.greys['dark-grey']};
    border-left: none;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    color: ${props => props.disabled ? props.theme.greys['mid-grey'] : props.theme.greys['dark-grey']};
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    display: flex;
    height: ${props => props.isMobile ? '40px' : '32px'};
    justify-content: center;
    width: ${props => props.isMobile ? '40px' : '32px'};

    &:hover {
        background-color: ${props => props.disabled ? 'none' : props.theme.greys.grey};
    }

    &:focus {
        outline: none;
    }
`;

registerLocale('en-US', enUS);
registerLocale('en-CA', enCA);
registerLocale('fr-CA', frCA);

const localeArray = [enUS, enCA, frCA];

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
    /**
     * Disables input
     */
    disabled?: boolean;
    id?: string;
    /**
     * Sets input label
     */
    label?: string;
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
    validationErrorMessage,
    ...props
}: DatepickerProps): ReactElement {
    const { t } = useTranslation('datepicker');
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
                            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                <Icon name="chevronLeft" size={isMobile ? '26' : '20'} />
                            </button>
                            <SelectWrapper>
                                <Select
                                    options={monthsOptions}
                                    onChange={options => {
                                        changeMonth(months.indexOf(options.label));
                                    }}
                                    value={monthsOptions[getMonth(date)].value}
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
                                <Icon name="chevronRight" size={isMobile ? '26' : '20'} />
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
