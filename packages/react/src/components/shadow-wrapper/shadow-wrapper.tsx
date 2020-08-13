import React, { ReactElement, ReactNode } from 'react';
import root from 'react-shadow/styled-components';

interface ShadowWrapperProps {
    children: ReactNode;
    /**
     * Sets host element tag
     * @default div
     */
    tagName?: string;
}

export function ShadowWrapper({ children, tagName = 'div' }: ShadowWrapperProps): ReactElement {
    const WrapperTag = root[tagName];
    return <WrapperTag>{children}</WrapperTag>;
}
