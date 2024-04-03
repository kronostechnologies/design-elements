import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type DatepickerTokens =
    | 'datepicker-border-color'
    | 'datepicker-box-shadow-color'
    | 'datepicker-day-background-color'
    | 'datepicker-day-border-color'
    | 'datepicker-day-text-color'
    | 'datepicker-day-hover-background-color'
    | 'datepicker-day-disabled-text-color'
    | 'datepicker-day-disabled-hover-background-color'
    | 'datepicker-day-focus-background-color'
    | 'datepicker-day-focus-text-color'
    | 'datepicker-day-focus-border-color'
    | 'datepicker-day-focus-box-shadow-color'
    | 'datepicker-day-outside-month-text-color'
    | 'datepicker-day-selected-outside-month-background-color'
    | 'datepicker-day-selected-outside-month-border-color'
    | 'datepicker-day-selected-outside-month-text-color'
    | 'datepicker-day-selected-background-color'
    | 'datepicker-day-selected-border-color'
    | 'datepicker-day-selected-text-color'
    | 'datepicker-day-selected-hover-text-color'
    | 'datepicker-day-selected-focus-box-shadow-color'
    | 'datepicker-day-today-text-color'
    | 'datepicker-day-today-selected-text-color'
    | 'datepicker-header-background-color'
    | 'datepicker-header-nav-button-background-color'
    | 'datepicker-background-color'
    | 'datepicker-input-background-color'
    | 'datepicker-input-border-color'
    | 'datepicker-input-error-border-color'
    | 'datepicker-input-error-focus-border-color'
    | 'datepicker-input-placeholder-disabled-text-color'
    | 'datepicker-input-disabled-background-color'
    | 'datepicker-input-disabled-border-color'
    | 'datepicker-input-disabled-text-color'
    | 'datepicker-input-focus-border-color'
    | 'datepicker-calendar-toggle-button-background-color'
    | 'datepicker-calendar-toggle-button-border-color'
    | 'datepicker-calendar-toggle-button-text-color'
    | 'datepicker-calendar-toggle-button-disabled-background-color'
    | 'datepicker-calendar-toggle-button-disabled-border-color'
    | 'datepicker-calendar-toggle-button-disabled-text-color'
    | 'datepicker-calendar-toggle-button-hover-background-color'
    | 'datepicker-calendar-toggle-button-hover-border-color'
    | 'datepicker-calendar-toggle-button-hover-text-color'
    | 'datepicker-calendar-toggle-button-focus-border-color';

export type DatepickerTokenValue = AliasTokens | RefTokens;

export type DatepickerTokenMap = {
    [Token in DatepickerTokens]: DatepickerTokenValue;
};

export const defaultDatepickerTokens: DatepickerTokenMap = {
    // NEW
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

    // OLD
    'datepicker-day-disabled-hover-background-color': 'color-bg-disabled',
    'datepicker-day-focus-background-color': 'transparent-100',
    'datepicker-day-focus-text-color': 'color-content',
    'datepicker-day-focus-border-color': 'color-border-focus-inside',
    'datepicker-day-focus-box-shadow-color': 'color-border-focus-outside',

    'datepicker-day-selected-focus-box-shadow-color': 'color-border-focus-inside',
    'datepicker-day-selected-hover-text-color': 'color-content-selected',

    'datepicker-day-today-selected-text-color': 'color-content-selected',
    'datepicker-header-nav-button-background-color': 'transparent-100',

    'datepicker-input-background-color': 'color-input-bg',
    'datepicker-input-border-color': 'color-input-border',
    'datepicker-input-error-border-color': 'color-input-border-error',
    'datepicker-input-focus-border-color': 'color-border-focus-outside',
    'datepicker-input-error-focus-border-color': 'color-input-border-error',
    'datepicker-input-disabled-background-color': 'color-input-bg-disabled',
    'datepicker-input-disabled-border-color': 'color-input-border-disabled',
    'datepicker-input-disabled-text-color': 'color-input-content-disabled',
    'datepicker-input-placeholder-disabled-text-color': 'color-input-content-disabled',

    'datepicker-calendar-toggle-button-background-color': 'color-input-bg',
    'datepicker-calendar-toggle-button-border-color': 'color-input-border',
    'datepicker-calendar-toggle-button-text-color': 'color-input-content',
    'datepicker-calendar-toggle-button-disabled-background-color': 'color-input-bg-disabled',
    'datepicker-calendar-toggle-button-disabled-border-color': 'color-input-border-disabled',
    'datepicker-calendar-toggle-button-disabled-text-color': 'color-input-content-disabled',
    'datepicker-calendar-toggle-button-hover-background-color': 'color-input-bg-hover',
    'datepicker-calendar-toggle-button-hover-border-color': 'color-input-border-hover',
    'datepicker-calendar-toggle-button-hover-text-color': 'color-input-content-hover',
    'datepicker-calendar-toggle-button-focus-border-color': 'color-border-focus-outside',
};
