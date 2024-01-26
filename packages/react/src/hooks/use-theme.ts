import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { ResolvedTheme } from '../themes/tokens/theme';

export function useTheme(): ResolvedTheme {
    return useContext(ThemeContext);
}
