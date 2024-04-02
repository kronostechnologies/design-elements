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
    'datepicker-background-color': 'color-white',
    'datepicker-border-color': 'color-neutral-15',
    'datepicker-box-shadow-color': 'transparent-20',

    'datepicker-header-background-color': 'transparent-100',

    'datepicker-day-background-color': 'transparent-100',
    'datepicker-day-border-color': 'transparent-100',
    'datepicker-day-text-color': 'color-black',

    'datepicker-day-hover-background-color': 'color-neutral-15',
    'datepicker-day-disabled-text-color': 'color-neutral-30',

    'datepicker-day-outside-month-text-color': 'color-neutral-65',
    'datepicker-day-selected-outside-month-background-color': 'color-brand-05',
    'datepicker-day-selected-outside-month-border-color': 'color-brand-50',
    'datepicker-day-selected-outside-month-text-color': 'color-brand-70',
    'datepicker-day-selected-background-color': 'color-brand-05',
    'datepicker-day-selected-border-color': 'color-brand-50',
    'datepicker-day-selected-text-color': 'color-brand-70',

    'datepicker-day-today-text-color': 'color-brand-70',
};
