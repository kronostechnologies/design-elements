import { Theme } from '@design-elements/themes/theme';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

export function useTheme(): Theme {
    return useContext(ThemeContext);
}
