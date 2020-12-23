import { useFont } from '@design-elements/styles/font-loader';
import { useMainCss } from '@design-elements/styles/style-loader';
import bodyCss from './body.scss';

export { injectMainCss } from './style-loader';
export const mainCss = bodyCss.toString();

export function useStyle(isolateStyles: boolean): void {
    useFont(isolateStyles);
    useMainCss(isolateStyles);
}
