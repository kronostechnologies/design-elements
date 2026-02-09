import { enCA, enUS, frCA } from 'date-fns/locale';
import {
    FocusEvent,
    forwardRef,
    FunctionComponent,
    KeyboardEvent,
    PropsWithChildren,
    ReactElement,
    Ref,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import DatePicker, { DatePickerProps, ReactDatePickerCustomHeaderProps, registerLocale } from 'react-datepicker';
import datepickerCss from 'react-datepicker/dist/react-datepicker.min.css';
import styled, { createGlobalStyle } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { type ResolvedTheme } from '../../themes';
import { IGNORE_CLICK_OUTSIDE } from '../../utils/component-classes';
import { focus } from '../../utils/css-state';
import { eventIsInside } from '../../utils/events';
import { v4 as uuid } from '../../utils/uuid';
import { AbstractButton, Button } from '../buttons';
import { useDeviceContext } from '../device-context-provider';
import { FieldContainer } from '../field-container';
import { Icon } from '../icon';
import { inputsStyle } from '../text-input/styles';
import { type ToggletipProps } from '../toggletip';
import { type TooltipProps } from '../tooltip';
import { CalendarHeader } from './calendar-header';
import {
    DayOfWeek,
    getAlternateDateFormats,
    getLocale,
    getLocaleDateFormat,
    getLocaleDatePlaceholder,
    getLocaleMonthsOptions,
    getLocaleMonthsShort,
    getYearsOptions,
    setLocaleFirstDayOfWeek,
    SupportedLocale,
} from './utils';

type StyledDatePickerProps = DatePickerProps & {
    isMobile: boolean;
    theme: ResolvedTheme;
    valid?: boolean;
}

interface CalendarButtonProps {
    disabled?: boolean;
    theme: ResolvedTheme;
    isMobile?: boolean;
}

const Container = styled.div<{ isMobile: boolean, theme: ResolvedTheme }>`
    display: flex;

    .popper {
        z-index: 1000;

        &[data-placement^='bottom'] {
            margin-top: 0;
        }
    }

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
        margin-bottom: ${({ isMobile }) => (isMobile ? 'var(--spacing-1x)' : 'var(--spacing-half)')};
        padding: 0;
    }

    .react-datepicker__month {
        font-size: ${({ isMobile }) => (isMobile ? 1 : 0.875)}rem;
        margin: 0;
    }

    .react-datepicker__portal {
        background-color: ${({ theme }) => theme.component['datepicker-backdrop-color']};

        .react-datepicker__day-name {
            font-size: 1rem;
            line-height: ${({ isMobile }) => (isMobile ? 2 : 1.5)}rem;
            width: ${({ isMobile }) => (isMobile ? 'var(--size-2x)' : 'var(--size-2halfx)')};
        }

        .react-datepicker__day {
            height: ${({ isMobile }) => (isMobile ? 'var(--size-2x)' : 'var(--size-2halfx)')};
            line-height: ${({ isMobile }) => (isMobile ? 2 : 2.5)}rem;
            width: ${({ isMobile }) => (isMobile ? 'var(--size-2x)' : 'var(--size-2halfx)')};
        }
    }

    label + & {
        margin-top: var(--spacing-half);
    }
`;

const StyledDatePicker = styled(DatePicker)<StyledDatePickerProps>`
    &.datePickerInput {
        ${({ theme, isMobile, valid }) => inputsStyle({ theme, isMobile, isValid: valid })};
        border-radius: var(--border-radius) 0 0 var(--border-radius);
        border-right: 0;
        height: ${({ isMobile }) => (isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};
        padding: var(--spacing-half) 0 var(--spacing-half) var(--spacing-1x);
        width: ${({ isMobile }) => (isMobile ? 7 : 6.8)}rem;
    }
`;

const TodayButtonWrapper = styled.div`
    clear: both;
    padding-top: var(--spacing-1x);
    text-align: center;
`;

const CalendarButton = styled(AbstractButton)<CalendarButtonProps>`
    align-items: center;
    background: ${({ theme }) => theme.component['button-input-background-color']};
    border: 1px solid ${({ theme }) => theme.component['button-input-border-color']};
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    box-sizing: border-box;
    color: ${({ theme }) => theme.component['button-input-text-color']};
    display: flex;
    height: ${({ isMobile }) => (isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};
    justify-content: center;
    padding: 0 var(--spacing-1x);
    width: ${({ isMobile }) => (isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};

    &:hover {
        background-color: ${({ theme }) => theme.component['button-input-hover-background-color']};
        border: 1px solid ${({ theme }) => theme.component['button-input-hover-border-color']};
        color: ${({ theme }) => theme.component['button-input-hover-text-color']};
    }

    &:disabled {
        &,
        &:focus,
        &:hover {
            background-color: ${({ theme }) => theme.component['button-input-disabled-background-color']};
            border-color: ${({ theme }) => theme.component['button-input-disabled-border-color']};
            color: ${({ theme }) => theme.component['button-input-disabled-text-color']};
        }
    }

    &:focus {
        z-index: 10;
    }

    > svg {
        height: var(--size-1x);
        width: var(--size-1x);
    }
`;

const ReactDatePickerStyles = createGlobalStyle`
    ${datepickerCss.toString()}
`;

export interface DatepickerHandles {
    reset(): void;

    setDate(date: Date): void;
}

export interface DatepickerProps {
    className?: string;
    /** Sets default selected date */
    defaultDate?: Date;
    /** Sets date format (e.g.: dd/MM/yyyy). */
    dateFormat?: string;
    'data-testid'?: string;
    disabled?: boolean;
    /** Disables default margin */
    noMargin?: boolean;
    firstDayOfWeek?: DayOfWeek;
    hasTodayButton?: boolean;
    id?: string;
    /** Sets input label */
    label?: string;
    tooltip?: TooltipProps;
    toggletip?: ToggletipProps;
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
    /** Sets calendar date when initially open */
    openToDate?: Date | null;
    /** Sets calendar initially open (uncontrolled) */
    startOpen?: boolean;
    /**
     * Only allow input that strictly conforms to dateFormat
     * @default false
     */
    strictDateFormat?: boolean;
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
    hint?: string;

    onBlur?(event: FocusEvent<HTMLInputElement>): void;

    onCalendarClose?(): void;

    onCalendarOpen?(): void;

    onChange?(date: Date | null): void;

    onFocus?(event: FocusEvent<HTMLInputElement>): void;
}

registerLocale('en-CA', enCA);
registerLocale('en-US', enUS);
registerLocale('fr-CA', frCA);

const localeArray = [enUS, enCA, frCA];

export const Datepicker = forwardRef(({
    className,
    defaultDate,
    dateFormat: providedDateFormat,
    disabled,
    firstDayOfWeek,
    hasTodayButton,
    hint,
    id,
    label,
    locale = 'en-CA',
    maxDate,
    minDate,
    noMargin,
    onBlur,
    onCalendarClose,
    onCalendarOpen,
    onChange,
    onFocus,
    open,
    placeholder,
    required,
    openToDate,
    startOpen,
    strictDateFormat = false,
    tooltip,
    toggletip,
    valid = true,
    validationErrorMessage,
    ...props
}: DatepickerProps, ref: Ref<DatepickerHandles>): ReactElement => {
    const { t } = useTranslation('datepicker');
    const { isMobile } = useDeviceContext();
    const [selectedDate, setSelectedDate] = useState(defaultDate || null);
    const currentLocale = useMemo(() => getLocale(localeArray, locale), [locale]);
    const months = useMemo(() => getLocaleMonthsShort(currentLocale), [currentLocale]);
    const monthsOptions = useMemo(() => getLocaleMonthsOptions(currentLocale), [currentLocale]);
    const yearsOptions = useMemo(() => getYearsOptions(minDate, maxDate), [minDate, maxDate]);
    const calendarRef = useRef<HTMLDivElement>(null);
    const fieldId = useMemo(() => id || uuid(), [id]);
    const dateInputRef = useRef<DatePicker>(null);
    const calendarButtonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => ({
        reset: () => {
            setSelectedDate(defaultDate || null);
        },
        setDate: (date: Date) => {
            setSelectedDate(date);
        },
    }));

    useEffect(() => {
        if (firstDayOfWeek) {
            setLocaleFirstDayOfWeek(currentLocale, firstDayOfWeek);
        }
    }, [currentLocale, firstDayOfWeek]);

    function focusCalendarDate(): void {
        setTimeout(() => {
            const dateToFocus = calendarRef.current
                ?.querySelector('.react-datepicker__day[tabindex="0"]') as HTMLDivElement;

            if (dateToFocus && !calendarButtonRef.current?.matches(':focus')) {
                dateToFocus.focus();
            }
        }, 0);
    }

    function handleCalendarKeyDown(event: KeyboardEvent<HTMLElement>): void {
        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
                focusCalendarDate();
                break;
            case 'Escape':
                event.stopPropagation();
                dateInputRef.current?.setOpen(false);
                calendarButtonRef.current?.focus();
                break;
            case 'Enter':
            case ' ':
                if (dateInputRef.current?.isCalendarOpen()) {
                    event.stopPropagation();
                    dateInputRef.current?.setOpen(false);
                    onCalendarClose?.();
                }
                break;
        }
    }

    function handleCalendarSelect(): void {
        calendarButtonRef.current?.focus();
    }

    function handleCalendarButtonMouseDown(): void {
        // Workaround issue with Chrome 133 that crashes the tab when the calendar button is clicked
        setTimeout(() => {
            if (dateInputRef.current?.isCalendarOpen()) {
                dateInputRef.current?.setOpen(false);
                onCalendarClose?.();
            } else {
                dateInputRef.current?.setOpen(true);
                onCalendarOpen?.();
                focusCalendarDate();
            }
        }, 0);
    }

    function handleCalendarButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>): void {
        if (event.key === 'Enter' || event.key === ' ' /* Space bar */) {
            dateInputRef.current?.setOpen(true);
            onCalendarOpen?.();
            focusCalendarDate();
        }
    }

    const handleInputChange: (date: Date | null) => void = useCallback((date) => {
        setSelectedDate(date);

        if (onChange) {
            onChange(date);
        }
    }, [onChange]);

    const handleClickOutside: DatePickerProps['onClickOutside'] = (event) => {
        if (
            dateInputRef.current
            && calendarButtonRef.current
            && eventIsInside(event as unknown as Event, calendarButtonRef.current)
        ) {
            event.preventDefault();
        }
    };

    function handleInputClick(): void {
        dateInputRef.current?.setOpen(false, true);
    }

    const handleTodayButtonClick: () => void = useCallback(() => {
        handleInputChange(new Date());
        dateInputRef.current?.setOpen(false);
    }, [handleInputChange]);

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
        }
        if (providedDateFormat) {
            return providedDateFormat.toUpperCase();
        }
        return getLocaleDatePlaceholder(currentLocale);
    }, [currentLocale, placeholder, providedDateFormat]);

    // eslint-disable-next-line max-len
    // eslint-disable-next-line react/function-component-definition,react/no-unstable-nested-components,react/display-name
    const CalendarContainer: FunctionComponent<PropsWithChildren<{}>> = useMemo(() => ({ children }) => (
        <div
            aria-label={selectedDate?.toLocaleDateString(locale) || t('calendarContainerLabel')}
            aria-live="polite"
            aria-modal
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
    ), [handleTodayButtonClick, hasTodayButton, locale, selectedDate, t]);

    const dateFormats = useMemo(() => {
        const dateFormat = providedDateFormat || getLocaleDateFormat(currentLocale);
        return strictDateFormat ? [dateFormat] : getAlternateDateFormats(dateFormat);
    }, [currentLocale, providedDateFormat, strictDateFormat]);

    return (
        <>
            <ReactDatePickerStyles />
            <FieldContainer
                className={className}
                noMargin={noMargin}
                fieldId={fieldId}
                label={label}
                required={required}
                tooltip={tooltip}
                toggletip={toggletip}
                hint={hint}
                valid={valid}
                validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
            >
                <Container isMobile={isMobile}>
                    <StyledDatePicker
                        customInput={(
                            <input
                                type="text"
                                data-testid={props['data-testid'] ?? 'text-input'}
                            />
                        )}
                        isMobile={isMobile}
                        id={fieldId}
                        ref={dateInputRef}
                        renderCustomHeader={(customHeaderProps: ReactDatePickerCustomHeaderProps) => (
                            <CalendarHeader
                                months={months}
                                monthsOptions={monthsOptions}
                                yearsOptions={yearsOptions}
                                {...customHeaderProps /* eslint-disable-line react/jsx-props-no-spreading */}
                            />
                        )}
                        calendarContainer={CalendarContainer}
                        className="datePickerInput"
                        outsideClickIgnoreClass={IGNORE_CLICK_OUTSIDE}
                        dateFormat={dateFormats}
                        disabled={disabled}
                        locale={locale}
                        maxDate={maxDate || undefined}
                        minDate={minDate || undefined}
                        onChange={handleInputChange}
                        onSelect={handleCalendarSelect}
                        onBlur={handleInputBlur}
                        onFocus={onFocus}
                        onClickOutside={handleClickOutside}
                        onInputClick={handleInputClick}
                        onKeyDown={handleCalendarKeyDown}
                        open={open}
                        openToDate={openToDate || undefined}
                        placeholderText={getPlaceholder}
                        popperClassName="popper"
                        popperPlacement="bottom-start"
                        preventOpenOnFocus
                        selected={selectedDate}
                        showPopperArrow={false}
                        startOpen={startOpen}
                        strictParsing
                        required={required}
                        valid={valid}
                        withPortal={isMobile}
                        {...props /* eslint-disable-line react/jsx-props-no-spreading */}
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
});

Datepicker.displayName = 'Datepicker';
