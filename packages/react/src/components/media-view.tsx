import React, { Component, ReactNode } from 'react';

interface MediaViewProps {
    children?: ReactNode;
    maxWidth?: number;
    minWidth?: number;
}

interface State {
    screenWidth: number;
}

class MediaView extends Component<MediaViewProps, State> {
    constructor(props: MediaViewProps) {
        super(props);

        this.state = {
            screenWidth: (window.innerWidth || document.documentElement.clientWidth) ,
        };

        this.handleScreeResize = this.handleScreeResize.bind(this);
    }

    componentDidMount(): void {
        window.addEventListener('resize', this.handleScreeResize);
    }

    componentWillUnmount(): void {
        window.addEventListener('resize', this.handleScreeResize);
    }

    handleScreeResize(): void {
        this.setState({ screenWidth: (window.innerWidth || document.documentElement.clientWidth) });
    }

    render(): JSX.Element | null {
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
