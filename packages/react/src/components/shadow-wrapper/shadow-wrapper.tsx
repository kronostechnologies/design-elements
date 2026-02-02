import { FunctionComponent, PropsWithChildren } from 'react';
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
            {/* Fragment is needed as children can be multiple reactNode while StyleSheetManager supports only one */}
            {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
            <>
                {children}
            </>
        </StyleSheetManager>
    ),
);

export const ShadowWrapper: FunctionComponent<PropsWithChildren<ShadowWrapperProps>> = (
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

ShadowWrapper.displayName = 'ShadowWrapper';
