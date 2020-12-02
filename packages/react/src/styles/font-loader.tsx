import { useEffect } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax,import/no-unresolved
import fonts from '!!style-loader?injectType=lazyStyleTag!css-loader!sass-loader!./_fonts.scss';

export function useFont(isolateStyles: boolean): void {
    useEffect(() => {
        if (isolateStyles) {
            fonts.use();

            return () => fonts.unuse();
        }

        return () => undefined;
    }, [isolateStyles]);
}
