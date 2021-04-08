import React, { createContext, ReactElement, ReactNode, RefObject, useContext, useRef } from 'react';
import root from 'react-shadow/styled-components';
import { mainCss } from '../../styles';

interface ShadowWrapperProps {
    children: ReactNode;
    /**
     * Sets host element tag
     * @default div
     */
    tagName?: string;
}

type ShadowWrapperRef = RefObject<HTMLElement> | null;

const ShadowWrapperRefContext = createContext<ShadowWrapperRef>(null);

export function useShadowWrapperRefContext(): ShadowWrapperRef {
    return useContext(ShadowWrapperRefContext);
}

export function ShadowWrapper({ children, tagName = 'div' }: ShadowWrapperProps): ReactElement {
    const WrapperTag = root[tagName];
    const wrapperRef: ShadowWrapperRef = useRef(null);

    return (
        <WrapperTag ref={wrapperRef}>
            <ShadowWrapperRefContext.Provider value={wrapperRef}>
                <style>{mainCss}</style>
                {children}
            </ShadowWrapperRefContext.Provider>
        </WrapperTag>
    );
}
