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
import { Theme } from '../../themes';
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

const Container = styled.div<{ isMobile: boolean, theme: Theme }>`
    display: flex;

    .popper {
        z-index: 1000;

        &[data-placement^="bottom"] {
            margin-top: 0;
        }
    }

    .react-datepicker {
        border: 1px solid ${({ theme }) => theme.greys.grey};
        box-shadow: 0 10px 20px 0 rgb(0 0 0 / 19%);
        font-family: var(--font-family);
        padding: var(--spacing-3x) var(--spacing-2x);
    }

    .react-datepicker-wrapper {
        width: auto;
    }

    .react-datepicker__day {
        border: 1px solid transparent;
        box-sizing: border-box;
        height: var(--size-2x);
        line-height: 1.875rem;
        margin: 0;
        width: var(--size-2x);

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

        /* stylelint-disable-next-line declaration-colon-newline-after */
        ${({ isMobile, theme }) => isMobile && css`
            border: 1px solid ${theme.main['primary-1.1']};
            box-shadow: ${theme.tokens['focus-box-shadow']};
        `};

        &:focus {
            border: 1px solid ${({ theme }) => theme.main['primary-1.1']};
            box-shadow: ${({ theme }) => theme.tokens['focus-box-shadow']};
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
        color: ${({ theme }) => theme.greys['dark-grey']};

        &.react-datepicker__day--selected {
            color: ${({ theme }) => theme.greys.white};
        }
    }

    .react-datepicker__day--selected {
        background-color: ${({ theme }) => theme.main['primary-1.1']};
        border-radius: 50%;

        /* stylelint-disable-next-line declaration-colon-newline-after */
        ${({ isMobile, theme }) => (isMobile ? `
            &[tabindex="0"] {
                box-shadow: ${theme.tokens['focus-box-shadow']};
            }
        ` : `
            &:focus {
                box-shadow: ${theme.tokens['focus-box-shadow']};
            }
        `)};

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
        margin-bottom: ${({ isMobile }) => (isMobile ? 'var(--spacing-1x)' : 'var(--spacing-half)')};
        padding: 0;
    }

    .react-datepicker__month {
        font-size: ${({ isMobile }) => (isMobile ? 1 : 0.875)}rem;
        margin: 0;
    }

    .react-datepicker__portal {
        background-color: rgb(0 0 0 / 50%);

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
        return theme.greys.grey;
    }
    if (valid) {
        return theme.greys['dark-grey'];
    }
    return theme.notifications['alert-2.1'];
}

function getInputFocusBorderColor({ theme, valid }: StyledDatePickerProps): string {
    if (valid) {
        return theme.main['primary-1.1'];
    }
    return theme.notifications['alert-2.1'];
}

const StyledDatePicker = styled(DatePicker)<StyledDatePickerProps>`
    &.datePickerInput {
        background-color: ${({ disabled, theme }) => (disabled ? theme.greys['light-grey'] : theme.greys.white)};
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
            ${({ disabled, theme }) => (disabled ? `color: ${theme.greys['mid-grey']};` : '')}
        }

        &:focus {
            border: 1px solid ${getInputFocusBorderColor};
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
    background-color: ${({ disabled, theme }) => (disabled ? theme.greys['light-grey'] : theme.greys.white)};
    border: 1px solid ${({ disabled, theme }) => (disabled ? theme.greys.grey : theme.greys['dark-grey'])};
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    box-sizing: border-box;
    color: ${({ disabled, theme }) => (disabled ? theme.greys['mid-grey'] : theme.greys['dark-grey'])};
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    display: flex;
    height: ${({ isMobile }) => (isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};
    justify-content: center;
    width: ${({ isMobile }) => (isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};

    &:hover {
        background-color: ${({ disabled, theme }) => (disabled ? 'none' : theme.greys.grey)};
    }

    &:focus {
        border: 1px solid ${({ theme }) => theme.main['primary-1.1']};
        border-left: none;
        box-shadow: ${({ theme }) => theme.tokens['focus-box-shadow']};
        outline: none;
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
    startDate,
    startOpen,
    tooltip,
    valid = true,
    validationErrorMessage,
    ...props
}: DatepickerProps, ref: Ref<DatepickerHandles>): ReactElement => {
    const { t } = useTranslation('datepicker');
    const { isMobile } = useDeviceContext();
    const [selectedDate, setSelectedDate] = useState(startDate);
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
            setSelectedDate(startDate);
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

            if (dateToFocus) {
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
        }
    }

    function handleCalendarSelect(): void {
        calendarButtonRef.current?.focus();
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
        if (event.key === 'Enter' || event.key === ' ' /* Space bar */) {
            dateInputRef.current?.setOpen(true);
            focusCalendarDate();
        }
    }

    const handleInputChange: (date: Date) => void = useCallback((date) => {
        setSelectedDate(date);

        if (onChange) {
            onChange(date);
        }
    }, [onChange]);

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
