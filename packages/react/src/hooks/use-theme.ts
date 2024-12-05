import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { ResolvedTheme } from '../themes';

export function useTheme(): ResolvedTheme {
    return useContext(ThemeContext);
}
