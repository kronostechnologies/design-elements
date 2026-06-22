import { endOfDay, startOfDay } from 'date-fns';
import { type FC, forwardRef, PropsWithChildren, type ReactNode, type Ref, useCallback, useRef, useState } from 'react';
import DatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import datepickerCss from 'react-datepicker/dist/react-datepicker.min.css';
import styled, { createGlobalStyle } from 'styled-components';
import { useTranslation } from '../../../../i18n/use-translation';
import type { ResolvedTheme } from '../../../../themes';
import type { NonNullableProperties } from '../../../../utils/types';
import { Button } from '../../../buttons';
import { reactDatepickerStyles } from '../../../date-picker/internal/react-datepicker.styles';
import { SupportedLocale } from '../../../date-picker/utils';
import { useDeviceContext } from '../../../device-context-provider';
import { DateMaskedInput, DateMaskedInputProps } from '../../../masked-input';
import type { FilterDateRangePreset, FilterDateRangeValue } from '../../filter-date-range';
import { CalendarHeader } from './calendar-header';
import { getRangeFromPreset, hasSameRange, isSameDateTime } from './date-range-utils';
import type { ComputedPreset } from './presets';
import { CUSTOM_PRESET, PresetsList } from './presets-list';
import { useLocale } from './use-locale';

const Container = styled.div`
    display: grid;
    grid-template-areas:
        'shortcuts inputs'
        'shortcuts calendars'
        'footer footer';
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr auto;
    height: 24rem;
`;

const Footer = styled.div`
    box-shadow: 0 1px 4px 0 ${(props) => props.theme.component['filter-box-shadow-color']};
    display: flex;
    gap: var(--spacing-1x);
    grid-area: footer;
    justify-content: flex-end;
    padding: var(--spacing-1halfx) var(--spacing-2x);
`;

const StyledDateMaskedInput = styled(DateMaskedInput)`
    width: 110px;
`;

const Inputs = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.component['filter-divider-color']};
    display: flex;
    flex-direction: row;
    gap: var(--spacing-2x);
    grid-area: inputs;
    padding: var(--spacing-2x);
`;

interface CalendarsProps {
    $isMobile: boolean;
    theme: ResolvedTheme;
}

const Day = styled.div`
    user-select: none;

    &::before {
        content: attr(data-day);
        display: block;
        font-weight: var(--font-semi-bold);
        height: 0;
        pointer-events: none;
        visibility: hidden;
    }
`;

const Calendars = styled.div<CalendarsProps>`
    grid-area: calendars;
    padding: var(--spacing-2x);

    ${reactDatepickerStyles};

    .react-datepicker {
        border: none;
        box-shadow: none;
        padding: 0;
    }

    .react-datepicker__month-container + .react-datepicker__month-container {
        margin-left: var(--spacing-3x);
    }

    .react-datepicker__week {
        display: flex;
        gap: 0 var(--spacing-half);

        & + .react-datepicker__week {
            margin-top: var(--spacing-half);
        }
    }

    .react-datepicker__day {
        height: calc(var(--size-2x) - var(--spacing-half));
        line-height: calc(var(--size-2x) - var(--spacing-3quarter));
        width: calc(var(--size-2x) - var(--spacing-half));

        > ${Day} {
            border: 1px solid transparent;
        }
    }

    .react-datepicker__day--in-range.react-datepicker__day--in-range,
    .react-datepicker__day--in-selecting-range.react-datepicker__day--in-selecting-range {
        background-color: ${({ theme }) => theme.component['datepicker-day-selected-background-color']};
        border-radius: 0;
        box-shadow:
            calc(var(--spacing-half) / -2) 0 0 0 ${({ theme }) => theme.component['datepicker-day-selected-background-color']},
            calc(var(--spacing-half) / 2) 0 0 0 ${({ theme }) => theme.component['datepicker-day-selected-background-color']};
        color: ${({ theme }) => theme.component['datepicker-day-selected-text-color']};
        font-weight: ${({ theme }) => theme.component['datepicker-day-selected-font-weight']};

        &.react-datepicker__day--range-start,
        &.react-datepicker__day--selecting-range-start {
            border-color: transparent;
            border-radius: 50% 0 0 50%;
            box-shadow: calc(var(--spacing-half) / 2) 0 0 0 ${({ theme }) => theme.component['datepicker-day-selected-background-color']};

            :hover {
                background-color: ${({ theme }) => theme.component['datepicker-day-selected-background-color']};
                border-radius: 50% 0 0 50%;
                color: ${({ theme }) => theme.component['datepicker-day-selected-text-color']};
            }
        }

        &.react-datepicker__day--range-end,
        &.react-datepicker__day--selecting-range-end {
            border-color: transparent;
            border-radius: 0 50% 50% 0;
            box-shadow: calc(var(--spacing-half) / -2) 0 0 0 ${({ theme }) => theme.component['datepicker-day-selected-background-color']};

            :hover {
                background-color: ${({ theme }) => theme.component['datepicker-day-selected-background-color']};
                border-radius: 0 50% 50% 0;
                color: ${({ theme }) => theme.component['datepicker-day-selected-text-color']};
            }
        }

        :hover {
            background-color: ${({ theme }) => theme.component['datepicker-day-selected-background-color']};
            border-radius: 0;
            color: ${({ theme }) => theme.component['datepicker-day-selected-text-color']};
        }
    }

    .react-datepicker__day {
        border: none;
    }

    .react-datepicker__day--range-start,
    .react-datepicker__day--range-end,
    .react-datepicker__day--selected {
        > ${Day} {
            border: 1px solid ${({ theme }) => theme.component['datepicker-day-selected-border-color']};
            border-radius: 50%;
            box-sizing: border-box;
            height: calc(var(--size-2x) - var(--spacing-half));
            offset: 0;
            width: calc(var(--size-2x) - var(--spacing-half));
        }
    }

    .react-datepicker__day--range-start,
    .react-datepicker__day--selected {
        border-radius: 50% 0 0 50%;
    }

    .react-datepicker__day--range-end,
    .react-datepicker__day--selected {
        border-radius: 0 50% 50% 0;
    }

    .react-datepicker__day--selecting-range-start,
    .react-datepicker__day--selecting-range-end,
    .react-datepicker__day--selected {
        border-radius: 0;
    }

    &&& .react-datepicker__day--range-start.react-datepicker__day--range-end,
    &&& .react-datepicker__day--selecting-range-start.react-datepicker__day--selecting-range-end,
    .react-datepicker__day--selected:not(.react-datepicker__day--range-start) {
        border-radius: 50%;
        box-shadow: none;
    }

    .react-datepicker__day--outside-month {
        height: 0;
        visibility: hidden;
    }

    .react-datepicker__day--outside-month {
        &.react-datepicker__day--selected {
            border: none;
        }
    }

    .react-datepicker__header {
        margin-bottom: var(--spacing-2x);
    }

    .react-datepicker__month {
        margin: var(--spacing-1x) 0 0 var(--spacing-quarter);
    }
`;

const ReactDatePickerStyles = createGlobalStyle`
    ${datepickerCss.toString()}
`;

const renderDay = (day: number): ReactNode => (
    <Day data-day={day}>
        {day}
    </Day>
);

const CalendarContainer = forwardRef<HTMLDivElement>(({ children }: PropsWithChildren<{}>, ref) => (
    <div
        className="react-datepicker"
        ref={ref}
    >
        {children}
    </div>
));
CalendarContainer.displayName = 'CalendarContainer';

type DateMaskedInputOnChange = DateMaskedInputProps['onChange'];

export interface DateRangePanelProps {
    async?: boolean;
    defaultValue?: NonNullableProperties<FilterDateRangeValue>;
    firstFocusableRef?: Ref<HTMLDivElement>;
    locale?: SupportedLocale;
    presets?: FilterDateRangePreset[];
    selectedPreset: string | null;
    value?: FilterDateRangeValue;

    onApply?(value: FilterDateRangeValue): void;

    onCancel?(previousValue: FilterDateRangeValue): void;

    onChange?(value: FilterDateRangeValue): void;

    onPresetChange?(preset: string | null): void;
}

export const DateRangePanel: FC<DateRangePanelProps> = ({
    async,
    defaultValue,
    firstFocusableRef,
    locale: providedLocale,
    onApply,
    onCancel,
    onChange,
    onPresetChange,
    presets,
    selectedPreset: providedSelectedPreset,
    value,
}) => {
    const { i18n: { language }, t } = useTranslation('filter');
    const { isMobile } = useDeviceContext();
    const isControlled = value !== undefined;
    const currentLocale = useLocale(providedLocale || language);
    const [internalValue, setInternalValue] = useState<FilterDateRangeValue>({
        from: value?.from ?? defaultValue?.from ?? null,
        to: value?.to ?? defaultValue?.to ?? null,
    });
    const currentValue = isControlled && !async ? value : internalValue;
    const previousValue = useRef<FilterDateRangeValue>(currentValue);
    const startDate = currentValue?.from ?? null;
    const endDate = currentValue?.to ?? null;
    const [maskedStartDate, setMaskedStartDate] = useState(startDate ?? '');
    const [maskedEndDate, setMaskedEndDate] = useState(endDate ?? '');
    const [selectedPreset, setSelectedPreset] = useState<string | null>(
        providedSelectedPreset ?? (maskedStartDate || maskedEndDate ? CUSTOM_PRESET : null),
    );
    const datePickerRef = useRef<DatePicker>(null);

    const updateValue = useCallback((newValue: FilterDateRangeValue): void => {
        if (newValue.from && !newValue.to) {
            datePickerRef.current?.setPreSelection(newValue.from);
        } else if (!newValue.from && newValue.to) {
            datePickerRef.current?.setPreSelection(newValue.to);
        }

        setInternalValue(newValue);
        onChange?.(newValue);
    }, [onChange]);

    const handleStartDateChange: DateMaskedInputOnChange = useCallback((
        from: Date | null,
        _: string,
        newFormattedValue: string,
    ) => {
        if (!isSameDateTime(currentValue.from, from)) {
            updateValue({ ...currentValue, from: from ? startOfDay(from) : null });
        }
        setMaskedStartDate(newFormattedValue);
        setSelectedPreset(CUSTOM_PRESET);
        if (!async) {
            onPresetChange?.(null);
        }
        datePickerRef.current?.setPreSelection(null);
    }, [updateValue, currentValue, async, onPresetChange]);

    const handleEndDateChange: DateMaskedInputOnChange = useCallback((
        to: Date | null,
        _: string,
        newFormattedValue: string,
    ) => {
        if (!isSameDateTime(currentValue.to, to)) {
            updateValue({ ...currentValue, to: to ? endOfDay(to) : null });
        }
        setMaskedEndDate(newFormattedValue);
        setSelectedPreset(CUSTOM_PRESET);
        if (!async) {
            onPresetChange?.(null);
        }
        datePickerRef.current?.setPreSelection(null);
    }, [updateValue, currentValue, async, onPresetChange]);

    const handleRangeChange = useCallback((dates: [Date | null, Date | null]): void => {
        const [start, end] = dates;
        if (!isSameDateTime(currentValue.from, start) || !isSameDateTime(currentValue.to, end)) {
            updateValue({ from: start ? startOfDay(start) : null, to: end ? endOfDay(end) : null });
        }
        setMaskedStartDate(start ?? '');
        setMaskedEndDate(end ?? '');
        setSelectedPreset(CUSTOM_PRESET);
    }, [currentValue.from, currentValue.to, updateValue]);

    const handleCancel = useCallback((): void => {
        onCancel?.(previousValue.current);
    }, [onCancel, previousValue]);

    const handleApply = useCallback((): void => {
        if (selectedPreset !== CUSTOM_PRESET) {
            onPresetChange?.(selectedPreset);
        }
        previousValue.current = internalValue;
        onApply?.(internalValue);
    }, [internalValue, onApply, onPresetChange, selectedPreset]);

    const handlePresetClick = useCallback((preset: ComputedPreset | null) => {
        const { from, to } = getRangeFromPreset(preset);
        updateValue({ from, to });
        setMaskedStartDate(from ?? '');
        setMaskedEndDate(to ?? '');
        setSelectedPreset(preset?.label ?? null);
        if (!async) {
            onPresetChange?.(preset?.label ?? null);
        }
    }, [async, onPresetChange, updateValue]);

    const handleCustomPresetClick = useCallback(() => {
        setSelectedPreset(CUSTOM_PRESET);
    }, []);

    const selectedValueIsSameAsOnOpen: boolean = hasSameRange(internalValue, previousValue.current);

    return (
        <Container data-testid="date-range-panel">
            <ReactDatePickerStyles />
            <PresetsList
                firstFocusableRef={firstFocusableRef}
                onCustomPresetClick={handleCustomPresetClick}
                onPresetClick={handlePresetClick}
                presets={presets}
                selectedPreset={selectedPreset}
            />

            <Inputs>
                <StyledDateMaskedInput
                    data-testid="start-date"
                    defaultValue={defaultValue?.from}
                    label={t('date.startDate')}
                    value={maskedStartDate}
                    onChange={handleStartDateChange}
                />
                <StyledDateMaskedInput
                    data-testid="end-date"
                    defaultValue={defaultValue?.to}
                    label={t('date.endDate')}
                    value={maskedEndDate}
                    onChange={handleEndDateChange}
                />
            </Inputs>

            <Calendars $isMobile={isMobile}>
                <DatePicker
                    calendarContainer={CalendarContainer}
                    endDate={currentValue.to}
                    inline
                    isClearable
                    locale={currentLocale}
                    monthsShown={2}
                    onChange={handleRangeChange}
                    ref={datePickerRef}
                    renderDayContents={renderDay}
                    renderCustomHeader={(customHeaderProps: ReactDatePickerCustomHeaderProps) => (
                        <CalendarHeader
                            locale={currentLocale}
                            {...customHeaderProps /* eslint-disable-line react/jsx-props-no-spreading */}
                        />
                    )}
                    selected={currentValue.from || currentValue.to}
                    selectsRange
                    showPreviousMonths={false}
                    startDate={currentValue?.from}
                    swapRange
                />
            </Calendars>

            {async && (
                <Footer>
                    <Button
                        data-testid="cancel-button"
                        label={t('cancel')}
                        buttonType="tertiary"
                        onClick={handleCancel}
                    />
                    <Button
                        data-testid="apply-button"
                        disabled={selectedValueIsSameAsOnOpen}
                        label={t('apply')}
                        buttonType="primary"
                        onClick={handleApply}
                    />
                </Footer>
            )}
        </Container>
    );
};

DateRangePanel.displayName = 'DateRangePanel';
