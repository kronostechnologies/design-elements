import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Theme } from '../themes';

export function useTheme(): Theme {
    return useContext(ThemeContext);
}
