import { useEffect } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax,import/no-unresolved
import mainCss from '!!style-loader?injectType=lazyStyleTag!css-loader!sass-loader!./body.scss';

export function useMainCss(isolateStyles: boolean): void {
    useEffect(() => {
        if (!isolateStyles) {
            mainCss.use();

            return () => mainCss.unuse();
        }
        return () => undefined;
    }, [isolateStyles]);
}

export function injectMainCss(): void {
    mainCss.use();
}
