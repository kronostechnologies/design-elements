import React, { Component } from 'react';

import { Child } from './buttons/abstract-button';

interface MediaViewProps {
    children?: Child;
    maxWidth?: number;
    minWidth?: number;
}

interface State {
    screenWidth: number;
}

class MediaView extends Component<{}, State> {
    constructor(props: MediaViewProps) {
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
    }
}

export { MediaView };
