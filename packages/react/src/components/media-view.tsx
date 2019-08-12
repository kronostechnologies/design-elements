import React, { Component, ReactNode } from 'react';

import { Children } from './buttons/abstract-button';

interface MediaViewProps {
    children?: ReactNode[] | string;
    maxWidth?: number;
    minWidth?: number;
}

class MediaView extends Component<{}, {screenWidth: number, children?: Children}> {
    constructor(props: any[]) {
        super(props);

        this.state = {
            screenWidth: (window.innerWidth || document.documentElement.clientWidth) ,
        };

        this.handleScreeResize = this.handleScreeResize.bind(this);
    }

    componentDidMount() {
        return window.addEventListener('resize', this.handleScreeResize);
    }

    componentWillUnmount() {
        return window.addEventListener('resize', this.handleScreeResize);
    }

    handleScreeResize() {
        return this.setState({screenWidth: (window.innerWidth || document.documentElement.clientWidth)});
    }

    render() {
        const { children, maxWidth, minWidth }: MediaViewProps =  this.props;
        const { screenWidth } = this.state;

        const isMinDisplay = (screenWidth >= minWidth);
        const isMaxDisplay = (screenWidth < maxWidth);

        if (isMinDisplay || isMaxDisplay) {
            return <>{children}</>;
        }

        return null;
    }
}

export { MediaView };
