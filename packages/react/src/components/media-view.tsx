import React, { ReactNode, useEffect, useState } from 'react';

interface MediaViewProps {
    children?: ReactNode;
    maxWidth?: number;
    minWidth?: number;
}

interface State {
    screenWidth: number;
}

const MediaView = ({ children, maxWidth, minWidth }: MediaViewProps) => {

    const [{ screenWidth }, setScreenWidth] = useState<State>({ screenWidth: (window.innerWidth || document.documentElement.clientWidth) });

    useEffect(() => {
        window.addEventListener('resize', handleScreeResize);
        return () => {
            window.addEventListener('resize', handleScreeResize);
        };
    }, []);

    const handleScreeResize = (): void => {
        setScreenWidth({ screenWidth: (window.innerWidth || document.documentElement.clientWidth) });
    };

    let isMinDisplay = false;
    let isMaxDisplay = false;
    if (minWidth !== undefined) {
        isMinDisplay = (screenWidth >= minWidth);
    }
    if (maxWidth !== undefined) {
        isMaxDisplay = (screenWidth < maxWidth);
    }

    if (isMinDisplay || isMaxDisplay) {
        return <>{children}</>;
    }

    return null;
};

export { MediaView };
