import { Locale } from 'date-fns';
import { enCA, enUS, frCA } from 'date-fns/locale';
import { useMemo } from 'react';
import { registerLocale } from 'react-datepicker';
import { getLocale } from '../../../date-picker/utils';

registerLocale('en-CA', enCA);
registerLocale('en-US', enUS);
registerLocale('fr-CA', frCA);

const localeArray = [enUS, enCA, frCA];

export function useLocale(locale: string): Locale {
    return useMemo(() => getLocale(localeArray, locale), [locale]);
}
