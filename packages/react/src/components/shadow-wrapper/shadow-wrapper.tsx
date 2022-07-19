import { FunctionComponent } from 'react';
import { createProxy } from 'react-shadow';
import { StyleSheetManager } from 'styled-components';
import { mainCss } from '../../styles';

interface ShadowWrapperProps {
    /**
     * Sets host element tag
     * @default div
     */
    tagName?: string;
}

const reactShadow = createProxy(
    {},
    'styled-components',
    ({ root, children }) => (
        <StyleSheetManager target={root}>
            {children}
        </StyleSheetManager>
    ),
);

export const ShadowWrapper: FunctionComponent<ShadowWrapperProps> = (
    { children, tagName = 'div' },
) => {
    const WrapperTag = reactShadow[tagName];
    return (
        <WrapperTag>
            <style>{mainCss}</style>
            {children}
        </WrapperTag>
    );
};
