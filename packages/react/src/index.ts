import './styled-components-theme';

// eslint-disable-next-line no-underscore-dangle, no-var, vars-on-top
declare global { var __DS_DEV__: boolean; }
// eslint-disable-next-line no-underscore-dangle
global.__DS_DEV__ = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';

export * from './components';

// Hooks
export { useTheme } from './hooks/use-theme';
export { useToast } from './hooks/use-toast';

// Themes
export { equisoftTheme, buildTheme } from './themes';
export { injectMainCss } from './styles';
export { ResolvedTheme as Theme, ThemeCustomization } from './themes/theme';
