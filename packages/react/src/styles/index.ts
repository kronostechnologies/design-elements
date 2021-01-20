import bodyCss from './body.scss';
import { useFont } from './font-loader';
import { useMainCss } from './style-loader';

export { injectMainCss } from './style-loader';
export const mainCss = bodyCss.toString();

export function useStyle(isolateStyles: boolean): void {
    useFont(isolateStyles);
    useMainCss(isolateStyles);
}
