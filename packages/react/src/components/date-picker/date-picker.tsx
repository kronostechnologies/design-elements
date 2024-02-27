import { enCA, enUS, frCA } from 'date-fns/locale';
import {
    FocusEvent,
    forwardRef,
    FunctionComponent,
    KeyboardEvent,
    MouseEvent,
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
import DatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import datepickerCss from 'react-datepicker/dist/react-datepicker.min.css';
import styled, { createGlobalStyle, css } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { ResolvedTheme } from '../../themes/theme';
import { eventIsInside } from '../../utils/events';
import { v4 as uuid } from '../../utils/uuid';
import { Button } from '../buttons/button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { Icon } from '../icon/icon';
import { TooltipProps } from '../tooltip/tooltip';
import { CalendarHeader } from './calendar-header';
import {
    DayOfWeek,
    getLocale,
    getLocaleDateFormat,
    getLocaleDatePlaceholder,
    getLocaleMonthsOptions,
    getLocaleMonthsShort,
    getYearsOptions,
    setLocaleFirstDayOfWeek,
    SupportedLocale,
} from './utils/datepicker-utils';
import { focus } from '../../utils/css-state';

interface StyledDatePickerProps extends ReactDatePickerProps {
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
        border: 1px solid ${({ theme }) => theme.component['datepicker-border-color']};
        box-shadow: 0 10px 20px 0 ${({ theme }) => theme.component['datepicker-shadow-color']};
        font-family: var(--font-family);
        padding: var(--spacing-3x) var(--spacing-2x);
    }

    .react-datepicker-wrapper {
        width: auto;
    }

    .react-datepicker__day {
        border: 1px solid ${({ theme }) => theme.component['datepicker-day-border-color']};
        box-sizing: border-box;
        height: var(--size-2x);
        line-height: 1.875rem;
        margin: 0;
        width: var(--size-2x);

        &:hover {
            background-color: ${({ theme }) => theme.component['datepicker-day-hover-background-color']};
            border-radius: 50%;
        }

        &:focus {
            outline: none;
        }
    }

    .react-datepicker__day--disabled {
        color: ${({ theme }) => theme.component['datepicker-day-disabled-text-color']};

        &:hover {
            background-color: ${({ theme }) => theme.component['datepicker-day-disabled-hover-background-color']};
        }
    }

    .react-datepicker__day--keyboard-selected {
        background-color: ${({ theme }) => theme.component['datepicker-day-keyboard-selected-background-color']};
        border-radius: 50%;
        box-sizing: border-box;
        color: ${({ theme }) => theme.component['datepicker-day-keyboard-selected-text-color']};

        ${({ isMobile, theme }) => isMobile && css`
            border: 1px solid ${theme.component['datepicker-day-keyboard-selected-mobile-border-color']};
            box-shadow: 0 0 0 2px ${theme.component['datepicker-day-keyboard-selected-mobile-shadow-color']};
`};

        &:focus {
            border: 1px solid ${({ theme }) => theme.component['datepicker-day-keyboard-selected-focus-border-color']};
            box-shadow: 0 0 0 2px ${({ theme }) => theme.component['datepicker-day-keyboard-selected-focus-shadow-color']};
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
            background-color: ${({ theme }) => theme.component['datepicker-day-outside-month-selected-background-color']};
            border: 1px solid ${({ theme }) => theme.component['datepicker-day-outside-month-selected-border-color']};
            color: ${({ theme }) => theme.component['datepicker-day-outside-month-selected-text-color']};
        }
    }

    .react-datepicker__day--selected {
        background-color: ${({ theme }) => theme.component['datepicker-day-selected-background-color']};
        border: 1px solid ${({ theme }) => theme.component['datepicker-day-selected-border-color']};
        border-radius: 50%;
        color: ${({ theme }) => theme.component['datepicker-day-selected-text-color']};
        font-weight: var(--font-semi-bold);

        ${({ isMobile, theme }) => (isMobile ? `
            &[tabindex="0"] {
                box-shadow: 0 0 0 2px ${theme.component['datepicker-day-selected-mobile-shadow-color']};
            }
        ` : `
            &:focus {
                box-shadow: 0 0 0 2px  ${theme.component['datepicker-day-selected-focus-shadow-color']};
            }
        `)};

        &:hover {
            color: ${({ theme }) => theme.component['datepicker-day-selected-hover-text-color']};
        }
    }

    .react-datepicker__day--today {
        color: ${({ theme }) => theme.component['datepicker-day-today-text-color']};
        font-weight: var(--font-semi-bold);

        &.react-datepicker__day--selected {
            color: ${({ theme }) => theme.component['datepicker-day-today-selected-text-color']};
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
        background-color: ${({ theme }) => theme.component['datepicker-background-color']};

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

function getInputBorderColor({ theme, disabled, valid }: StyledDatePickerProps): string {
    if (disabled) {
        return theme.component['datepicker-input-disabled-border-color'];
    }
    if (valid) {
        return theme.component['datepicker-input-border-color'];
    }
    return theme.component['datepicker-input-error-border-color'];
}

function getInputFocusBorderColor({ theme, valid }: StyledDatePickerProps): string {
    if (valid) {
        return theme.component['datepicker-input-focus-border-color'];
    }
    return theme.component['datepicker-input-focus-error-border-color'];
}

const StyledDatePicker = styled(DatePicker)<StyledDatePickerProps>`
    &.datePickerInput {
        background-color: ${({ disabled, theme }) => (disabled ? theme.component['datepicker-input-disabled-background-color'] : theme.component['datepicker-input-background-color'])};
        border: 1px solid ${getInputBorderColor};
        border-radius: var(--border-radius) 0 0 var(--border-radius);
        border-right: 0;
        box-sizing: border-box;
        font-family: inherit;
        font-size: ${({ isMobile }) => (isMobile ? '1rem' : '0.875rem')};
        height: ${({ isMobile }) => (isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};
        padding: var(--spacing-half) 0 var(--spacing-half) var(--spacing-1x);
        width: ${({ isMobile }) => (isMobile ? 7 : 6.8)}rem;

        &::placeholder {
            ${({ disabled, theme }) => (disabled ? `color: ${theme.component['datepicker-input-placeholder-disabled-text-color']};` : '')}
        }

        ${focus};
        &:focus {
            border: 1px solid ${getInputFocusBorderColor};
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
    background-color: ${({ disabled, theme }) => (disabled ? theme.component['datepicker-calendar-button-disabled-background-color'] : theme.component['datepicker-calendar-button-background-color'])};
    border: 1px solid ${({ disabled, theme }) => (disabled ? theme.component['datepicker-calendar-button-disabled-border-color'] : theme.component['datepicker-calendar-button-border-color'])};
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    box-sizing: border-box;
    color: ${({ disabled, theme }) => (disabled ? theme.component['datepicker-calendar-button-disabled-text-color'] : theme.component['datepicker-calendar-button-text-color'])};
    display: flex;
    height: ${({ isMobile }) => (isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};
    justify-content: center;
    width: ${({ isMobile }) => (isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};

    &:hover {
        background-color: ${({ disabled, theme }) => (disabled ? theme.component['datepicker-calendar-button-disabled-background-color'] : theme.component['datepicker-calendar-button-hover-background-color'])};
        border: 1px solid ${({ disabled, theme }) => (disabled ? theme.component['datepicker-calendar-button-disabled-border-color'] : theme.component['datepicker-calendar-button-hover-border-color'])};
        color: ${({ disabled, theme }) => (disabled ? theme.component['datepicker-calendar-button-disabled-text-color'] : theme.component['datepicker-calendar-button-hover-text-color'])};
    }

    ${focus};
    &:focus {
        border: 1px solid ${({ theme }) => theme.component['datepicker-calendar-button-focus-border-color']};
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

interface DatepickerProps {
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

    onChange?(date: Date): void;

    onFocus?(event: FocusEvent<HTMLInputElement>): void;
}

registerLocale('en-CA', enCA);
registerLocale('en-US', enUS);
registerLocale('fr-CA', frCA);

const localeArray = [enUS, enCA, frCA];

export const Datepicker = forwardRef(({
    className,
    defaultDate,
    dateFormat,
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
    tooltip,
    valid = true,
    validationErrorMessage,
    ...props
}: DatepickerProps, ref: Ref<DatepickerHandles>): ReactElement => {
    const { t } = useTranslation('datepicker');
    const { isMobile } = useDeviceContext();
    const [selectedDate, setSelectedDate] = useState(defaultDate);
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
            setSelectedDate(defaultDate);
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

    function handleCalendarKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
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
        if (dateInputRef.current?.isCalendarOpen()) {
            dateInputRef.current?.setOpen(false);
            onCalendarClose?.();
        } else {
            dateInputRef.current?.setOpen(true);
            onCalendarOpen?.();
            focusCalendarDate();
        }
    }

    function handleCalendarButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>): void {
        if (event.key === 'Enter' || event.key === ' ' /* Space bar */) {
            dateInputRef.current?.setOpen(true);
            onCalendarOpen?.();
            focusCalendarDate();
        }
    }

    const handleInputChange: (date: Date) => void = useCallback((date) => {
        setSelectedDate(date);

        if (onChange) {
            onChange(date);
        }
    }, [onChange]);

    function handleClickOutside(event: MouseEvent<HTMLInputElement>): void {
        if (
            dateInputRef.current
            && calendarButtonRef.current
            && eventIsInside(event as unknown as Event, calendarButtonRef.current)
        ) {
            dateInputRef.current.setOpen(true);
        }
    }

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
        if (dateFormat) {
            return dateFormat.toUpperCase();
        }
        return getLocaleDatePlaceholder(currentLocale);
    }, [currentLocale, placeholder, dateFormat]);

    // eslint-disable-next-line react/function-component-definition,react/no-unstable-nested-components
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
                        renderCustomHeader={(customHeaderProps) => (
                            <CalendarHeader
                                months={months}
                                monthsOptions={monthsOptions}
                                yearsOptions={yearsOptions}
                                {...customHeaderProps /* eslint-disable-line react/jsx-props-no-spreading */}
                            />
                        )}
                        calendarContainer={CalendarContainer}
                        className="datePickerInput"
                        dateFormat={dateFormat || getLocaleDateFormat(currentLocale)}
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
