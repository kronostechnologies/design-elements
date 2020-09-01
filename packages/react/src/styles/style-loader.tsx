import mainCss from '!!style-loader?injectType=lazyStyleTag!css-loader!sass-loader!./body.scss';
import { useEffect } from 'react';

export function useMainCss(isolateStyles: boolean): void {
    useEffect(() => {
        if (!isolateStyles) {
            mainCss.use();

            return () => mainCss.unuse();
        }
        return () => undefined;
    }, []);
}
