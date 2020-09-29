import { enCA, enUS, frCA } from 'date-fns/locale';
import React, {
    FocusEvent,
    KeyboardEvent,
    MouseEvent,
    ReactElement,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import DatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import datepickerCss from 'react-datepicker/dist/react-datepicker.min.css';
import { useTranslation } from 'react-i18next';
import styled, { createGlobalStyle } from 'styled-components';
import uuid from 'uuid/v4';

import { Button } from '../buttons/button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { Icon } from '../icon/icon';
import { Theme } from '../theme-wrapper/theme-wrapper';
import { CalendarHeader } from './calendar-header';
import {
    getLocale,
    getLocaleDateFormat,
    getLocaleDatePlaceholder,
    getLocaleMonthsOptions,
    getLocaleMonthsShort,
    getYearsOptions,
    setLocaleFirstDayOfWeek,
} from './utils/datepicker-utils';

const Container = styled.div<{ isMobile: boolean, theme: Theme }>`
    display: flex;

    .popper[data-placement^="bottom"] {
        margin-top: 0;
        z-index: 1000;
    }

    .react-datepicker {
        border: 1px solid ${({ theme }) => theme.greys.grey};
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.19);
        font-family: 'Open Sans', sans-serif;
        padding: var(--spacing-3x) var(--spacing-2x);
    }

    .react-datepicker__day {
        border: 1px solid transparent;
        box-sizing: border-box;
        height: 32px;
        line-height: 30px;
        margin: 0;
        width: 32px;

        &:hover {
            background-color: ${({ theme }) => theme.greys.grey};
            border-radius: 50%;
        }

        &:focus {
            outline: none;
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
        border-radius: 50%;
        box-sizing: border-box;
        color: ${({ theme }) => theme.greys.black};
        ${({ isMobile, theme }) => isMobile && `
            border: 1px solid ${theme.main['primary-1.1']};
            box-shadow: ${theme.tokens['focus-box-shadow']};
        `}

        &:focus {
            border: 1px solid ${({ theme }) => theme.main['primary-1.1']};
            box-shadow: ${({ theme }) => theme.tokens['focus-box-shadow']};
        }
    }

    .react-datepicker__day-name {
        font-size: 0.875rem;
        font-weight: var(--font-bold);
        line-height: 1.25rem;
        margin: 0;
        text-transform: uppercase;
        width: 32px;
    }

    .react-datepicker__day--outside-month {
        color: ${({ theme }) => theme.greys['dark-grey']};

        &.react-datepicker__day--selected {
            color: ${({ theme }) => theme.greys.white};
        }
    }

    .react-datepicker__day--selected {
        background-color: ${({ theme }) => theme.main['primary-1.1']};
        border-radius: 50%;
        ${({ isMobile, theme }) => isMobile ? `
            &[tabindex="0"] {
                box-shadow: ${theme.tokens['focus-box-shadow']};
            }
        ` : `
            &:focus {
                box-shadow: ${theme.tokens['focus-box-shadow']};
            }
        `}

        &:hover {
            color: ${({ theme }) => theme.greys.black};
        }
    }

    .react-datepicker__day--today {
        color: ${({ theme }) => theme.main['primary-1.1']};
        font-weight: var(--font-normal);

        &.react-datepicker__day--selected {
            color: ${({ theme }) => theme.greys.white};
        }
    }

    .react-datepicker__header {
        background-color: ${({ theme }) => theme.greys.white};
        border-bottom: none;
        margin-bottom: ${({ isMobile }) => isMobile ? 'var(--spacing-1x)' : 'var(--spacing-half)'};
        padding: 0;
    }

    .react-datepicker__month {
        font-size: ${({ isMobile }) => isMobile ? 1 : 0.875}rem;
        margin: 0;
    }

    .react-datepicker__portal {
        background-color: rgba(0, 0, 0, 0.5);

        .react-datepicker__day-name {
            font-size: 1rem;
            line-height: 1.5rem;
            width: 40px;
        }

        .react-datepicker__day {
            height: 40px;
            line-height: 2.5rem;
            width: 40px;
        }
    }
`;

const StyledDatePicker = styled(DatePicker)<StyledDatePickerProps>`
    &.datePickerInput {
        background-color: ${({ disabled, theme }) => disabled ? theme.greys['light-grey'] : theme.greys.white};
        border: 1px solid ${({ disabled, theme, valid }) => getInputBorderColor(theme, disabled, valid)};
        border-radius: var(--border-radius) 0 0 var(--border-radius);
        box-sizing: border-box;
        font-family: inherit;
        font-size: ${({ isMobile }) => isMobile ? '1rem' : '0.875rem'};
        height: ${({ isMobile }) => isMobile ? '40px' : '32px'};
        padding: var(--spacing-half) 0 var(--spacing-half) var(--spacing-1x);
        width: ${({ isMobile }) => isMobile ? 113 : 109}px;

        &::placeholder {
            ${({ disabled, theme }) => disabled ? `color: ${theme.greys['mid-grey']};` : ''}
        }

        &:focus {
            border: 1px solid ${({ theme, valid }) => valid ? theme.main['primary-1.1'] : theme.notifications['error-2.1']};
            box-shadow: ${({ theme }) => theme.tokens['focus-box-shadow']};
            outline: none;
        }
    }
`;

const TodayButtonWrapper = styled.div`
    clear: both;
    padding-top: var(--spacing-1x);
    text-align: center;
`;

const CalendarButton = styled.button<CalendarButtonProps>`
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
        border: 1px solid ${({ theme }) => theme.main['primary-1.1']};
        border-left: none;
        box-shadow: ${({ theme }) => theme.tokens['focus-box-shadow']};
        outline: none;
        z-index: 10;
    }
`;

const ReactDatePickerStyles = createGlobalStyle`
    ${datepickerCss}
`;

export type SupportedLocale = 'fr-CA' | 'en-CA' | 'en-US';
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface StyledDatePickerProps extends ReactDatePickerProps {
    isMobile: boolean;
    theme: Theme;
    valid?: boolean;
}

interface CalendarButtonProps {
    disabled?: boolean;
    theme: Theme;
    isMobile?: boolean;
}

interface DatepickerProps {
    /** Sets date format (e.g.: dd/MM/yyyy). */
    dateFormat?: string;
    disabled?: boolean;
    /** Disables default margin */
    noMargin?: boolean;
    firstDayOfWeek?: DayOfWeek;
    hasTodayButton?: boolean;
    id?: string;
    /** Sets input label */
    label?: string;
    /**
     * Sets localization
     * @default en-CA
     */
    locale?: SupportedLocale;
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

    onCalendarClose?(): void;

    onCalendarOpen?(): void;

    onChange?(date: Date): void;

    onFocus?(event: FocusEvent<HTMLInputElement>): void;
}

registerLocale('en-CA', enCA);
registerLocale('en-US', enUS);
registerLocale('fr-CA', frCA);

export function Datepicker({
    dateFormat,
    disabled,
    noMargin,
    firstDayOfWeek,
    hasTodayButton,
    id,
    label,
    locale = 'en-CA',
    maxDate,
    minDate,
    onBlur,
    onCalendarClose,
    onCalendarOpen,
    onChange,
    onFocus,
    open,
    placeholder,
    startDate,
    startOpen,
    valid = true,
    validationErrorMessage,
    ...props
}: DatepickerProps): ReactElement {
    const { t } = useTranslation('datepicker');
    const localeArray = [ enUS, enCA, frCA ];
    const { isMobile } = useDeviceContext();
    const [ selectedDate, setSelectedDate ] = useState(startDate);
    const currentLocale = useMemo(() => getLocale(localeArray, locale), [ locale ]);
    const months = useMemo(() => getLocaleMonthsShort(currentLocale), [ currentLocale ]);
    const monthsOptions = useMemo(() => getLocaleMonthsOptions(currentLocale), [ currentLocale ]);
    const yearsOptions = useMemo(() => getYearsOptions(minDate, maxDate), [ minDate, maxDate ]);
    const calendarRef = useRef<HTMLDivElement>(null);
    const fieldId = id || useMemo(uuid, []);
    const dateInputRef = useRef<DatePicker>(null);
    const calendarButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (firstDayOfWeek) {
            setLocaleFirstDayOfWeek(currentLocale, firstDayOfWeek);
        }
    }, [ firstDayOfWeek ]);

    function handleCalendarKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
        if (event.key === 'Escape') {
            event.stopPropagation();
            dateInputRef.current?.setOpen(false);
            calendarButtonRef.current?.focus();
        }
    }

    function handleCalendarSelect(): void {
        calendarButtonRef.current?.focus();
    }

    function focusCalendarDate(): void {
        setTimeout(() => {
            const dateToFocus =
                calendarRef.current?.querySelector('.react-datepicker__day[tabindex="0"]') as HTMLDivElement;

            if (dateToFocus) {
                dateToFocus.focus();
            }
        }, 0);
    }

    function handleCalendarButtonMouseDown(event: MouseEvent<HTMLButtonElement>): void {
        event.stopPropagation();
        if (dateInputRef.current?.isCalendarOpen()) {
            dateInputRef.current?.setOpen(false);
        } else {
            dateInputRef.current?.setOpen(true);
            focusCalendarDate();
        }
    }

    function handleCalendarButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>): void {
        if (event.key === 'Enter' || event.key === ' ' /* Spacebar */) {
            dateInputRef.current?.setOpen(true);
            focusCalendarDate();
        }
    }

    function handleInputChange(date: Date): void {
        setSelectedDate(date);

        if (onChange) {
            onChange(date);
        }
    }

    function handleInputClick(): void {
        dateInputRef.current?.setOpen(false, true);
    }

    function handleTodayButtonClick(): void {
        handleInputChange(new Date());
        dateInputRef.current?.setOpen(false);
    }

    function handleInputBlur(event: FocusEvent<HTMLInputElement>): void {
        const isCalendarOpen = dateInputRef.current?.isCalendarOpen();

        if (isCalendarOpen !== undefined) {
            dateInputRef.current?.setOpen(isCalendarOpen, false);
        }

        if (onBlur) {
            onBlur(event);
        }
    }

    const getPlaceholder = useMemo(() => {
        if (placeholder) {
            return placeholder;
        } else if (dateFormat) {
            return dateFormat.toUpperCase();
        } else {
            return getLocaleDatePlaceholder(currentLocale);
        }
    }, [ placeholder, dateFormat, locale ]);

    return (
        <>
            <ReactDatePickerStyles />
            <FieldContainer
                noMargin={noMargin}
                fieldId={fieldId}
                label={label}
                valid={valid}
                validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
            >
                <Container isMobile={isMobile}>
                    <StyledDatePicker
                        customInput={<input type="text" data-testid="text-input" />}
                        isMobile={isMobile}
                        id={fieldId}
                        ref={dateInputRef}
                        renderCustomHeader={({
                            ...customHeaderProps
                        }) => (
                            <CalendarHeader
                                months={months}
                                monthsOptions={monthsOptions}
                                yearsOptions={yearsOptions}
                                {...customHeaderProps}
                            />
                        )}
                        calendarContainer={({ children }) => (
                            <div
                                aria-label={selectedDate?.toLocaleDateString(locale) || t('calendarContainerLabel')}
                                aria-live="polite"
                                aria-modal={true}
                                className="react-datepicker"
                                role="dialog"
                                ref={calendarRef}
                            >
                                {children}
                                {hasTodayButton && (
                                    <TodayButtonWrapper>
                                        <Button
                                            aria-label={t('todayButtonAriaLabel')}
                                            buttonType="secondary"
                                            data-testid="today-button"
                                            label={t('todayButtonLabel')}
                                            type="button"
                                            onClick={handleTodayButtonClick}
                                        />
                                    </TodayButtonWrapper>
                                )}
                            </div>
                        )}
                        className="datePickerInput"
                        dateFormat={dateFormat || getLocaleDateFormat(currentLocale)}
                        disabled={disabled}
                        locale={locale}
                        maxDate={maxDate}
                        minDate={minDate}
                        onChange={handleInputChange}
                        onSelect={handleCalendarSelect}
                        onBlur={handleInputBlur}
                        onCalendarClose={onCalendarClose}
                        onCalendarOpen={onCalendarOpen}
                        onFocus={onFocus}
                        onInputClick={handleInputClick}
                        onKeyDown={handleCalendarKeyDown}
                        open={open}
                        placeholderText={getPlaceholder}
                        popperClassName="popper"
                        preventOpenOnFocus
                        selected={selectedDate}
                        showPopperArrow={false}
                        startOpen={startOpen}
                        valid={valid}
                        withPortal={isMobile}
                        {...props}
                    />
                    <CalendarButton
                        aria-label={selectedDate
                            ? `${t('calendarButtonSelectedLabel')} ${selectedDate.toLocaleDateString(locale)}`
                            : t('calendarButtonLabel')}
                        data-testid="calendar-button"
                        type="button"
                        disabled={disabled}
                        isMobile={isMobile}
                        onKeyDown={handleCalendarButtonKeyDown}
                        onMouseDown={handleCalendarButtonMouseDown}
                        ref={calendarButtonRef}
                        tabIndex={0}
                    >
                        <Icon name="calendar" size={isMobile ? '24' : '16'} />
                    </CalendarButton>
                </Container>
            </FieldContainer>
        </>
    );
}

function getInputBorderColor(theme: Theme, disabled?: boolean, valid?: boolean): string {
    if (disabled) {
        return theme.greys.grey;
    } else if (valid) {
        return theme.greys['dark-grey'];
    } else {
        return theme.notifications['error-2.1'];
    }
}
