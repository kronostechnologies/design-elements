import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type DatepickerTokens =
    | 'datepicker-border-color'
    | 'datepicker-box-shadow-color'
    | 'datepicker-day-border-color'
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
    | 'datepicker-calendar-button-background-color'
    | 'datepicker-calendar-button-border-color'
    | 'datepicker-calendar-button-text-color'
    | 'datepicker-calendar-button-disabled-background-color'
    | 'datepicker-calendar-button-disabled-border-color'
    | 'datepicker-calendar-button-disabled-text-color'
    | 'datepicker-calendar-button-hover-background-color'
    | 'datepicker-calendar-button-hover-border-color'
    | 'datepicker-calendar-button-hover-text-color'
    | 'datepicker-calendar-button-focus-border-color';

export type DatepickerTokenValue = AliasTokens | RefTokens;

export type DatepickerTokenMap = {
    [Token in DatepickerTokens]: DatepickerTokenValue;
};

export const defaultDatepickerTokens: DatepickerTokenMap = {
    'datepicker-border-color': 'color-neutral-15',
    'datepicker-box-shadow-color': 'transparent-20',
    'datepicker-day-border-color': 'transparent-100',
    'datepicker-day-hover-background-color': 'color-neutral-15',
    'datepicker-day-disabled-text-color': 'color-neutral-30',
    'datepicker-day-disabled-hover-background-color': 'color-neutral-05',
    'datepicker-day-focus-background-color': 'color-white',
    'datepicker-day-focus-text-color': 'color-black',
    'datepicker-day-focus-border-color': 'color-brand-50',
    'datepicker-day-focus-box-shadow-color': 'color-brand-20',
    'datepicker-day-outside-month-text-color': 'color-neutral-65',
    'datepicker-day-selected-outside-month-background-color': 'color-brand-05',
    'datepicker-day-selected-outside-month-border-color': 'color-brand-50',
    'datepicker-day-selected-outside-month-text-color': 'color-brand-70',
    'datepicker-day-selected-background-color': 'color-brand-05',
    'datepicker-day-selected-border-color': 'color-brand-50',
    'datepicker-day-selected-text-color': 'color-brand-70',
    'datepicker-day-selected-focus-box-shadow-color': 'color-brand-20',
    'datepicker-day-selected-hover-text-color': 'color-black',
    'datepicker-day-today-text-color': 'color-brand-70',
    'datepicker-day-today-selected-text-color': 'color-brand-70',
    'datepicker-header-background-color': 'color-white',
    'datepicker-header-nav-button-background-color': 'color-white',
    'datepicker-background-color': 'transparent-50',
    'datepicker-input-disabled-border-color': 'color-neutral-30',
    'datepicker-input-border-color': 'color-neutral-65',
    'datepicker-input-error-border-color': 'color-alert-50',
    'datepicker-input-focus-border-color': 'color-brand-50',
    'datepicker-input-error-focus-border-color': 'color-alert-50',
    'datepicker-input-disabled-background-color': 'color-neutral-05',
    'datepicker-input-background-color': 'color-white',
    'datepicker-input-placeholder-disabled-text-color': 'color-neutral-30',
    'datepicker-input-disabled-text-color': 'color-neutral-30',
    'datepicker-calendar-button-background-color': 'color-white',
    'datepicker-calendar-button-border-color': 'color-neutral-65',
    'datepicker-calendar-button-text-color': 'color-neutral-50',
    'datepicker-calendar-button-disabled-background-color': 'color-neutral-05',
    'datepicker-calendar-button-disabled-border-color': 'color-neutral-30',
    'datepicker-calendar-button-disabled-text-color': 'color-neutral-30',
    'datepicker-calendar-button-hover-background-color': 'color-neutral-15',
    'datepicker-calendar-button-hover-border-color': 'color-neutral-90',
    'datepicker-calendar-button-hover-text-color': 'color-neutral-90',
    'datepicker-calendar-button-focus-border-color': 'color-brand-50',
};
