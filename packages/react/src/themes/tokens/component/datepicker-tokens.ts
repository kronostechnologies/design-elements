import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type DatepickerTokens =
    | 'datepicker-border-color'
    | 'datepicker-box-shadow-color'
    | 'datepicker-day-border-color'
    | 'datepicker-day-hover-background-color'
    | 'datepicker-day-disabled-text-color'
    | 'datepicker-day-outside-month-text-color'
    | 'datepicker-day-background-color'
    | 'datepicker-day-text-color'
    | 'datepicker-day-selected-outside-month-background-color'
    | 'datepicker-day-selected-outside-month-border-color'
    | 'datepicker-day-selected-outside-month-text-color'
    | 'datepicker-day-selected-background-color'
    | 'datepicker-day-selected-border-color'
    | 'datepicker-day-selected-text-color'
    | 'datepicker-day-today-text-color'
    | 'datepicker-header-background-color'
    | 'datepicker-background-color';

export type DatepickerTokenValue = AliasTokens | RefTokens;

export type DatepickerTokenMap = {
    [Token in DatepickerTokens]: DatepickerTokenValue;
};

export const defaultDatepickerTokens: DatepickerTokenMap = {
    'datepicker-background-color': 'color-bg-overlay',
    'datepicker-border-color': 'color-border-overlay',
    'datepicker-box-shadow-color': 'color-box-shadow',

    'datepicker-header-background-color': 'transparent-100',

    'datepicker-day-background-color': 'transparent-100',
    'datepicker-day-border-color': 'transparent-100',
    'datepicker-day-text-color': 'color-content',

    'datepicker-day-hover-background-color': 'color-bg-hover',
    'datepicker-day-disabled-text-color': 'color-content-disabled',

    'datepicker-day-outside-month-text-color': 'color-content-subtle',
    'datepicker-day-selected-outside-month-background-color': 'color-bg-selected',
    'datepicker-day-selected-outside-month-border-color': 'color-border-selected',
    'datepicker-day-selected-outside-month-text-color': 'color-content-selected',
    'datepicker-day-selected-background-color': 'color-bg-selected',
    'datepicker-day-selected-border-color': 'color-border-selected',
    'datepicker-day-selected-text-color': 'color-content-selected',

    'datepicker-day-today-text-color': 'color-content-selected',
};
