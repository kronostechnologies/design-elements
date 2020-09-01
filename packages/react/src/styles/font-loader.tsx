import fonts from '!!style-loader?injectType=lazyStyleTag!css-loader!sass-loader!./_fonts.scss';
import { useEffect } from 'react';

export function useFont(isolateStyles: boolean): void {
    useEffect(() => {
        if (isolateStyles) {
            fonts.use();

            return () => fonts.unuse();
        }

        return () => undefined;
    }, []);
}
