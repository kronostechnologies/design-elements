import React, { Component } from 'react';

export default class MediaView extends Component {
    constructor(props) {
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
        const { children, maxWidth, minWidth } =  this.props;
        const { screenWidth } = this.state;

        const isMinDisplay = (screenWidth >= minWidth);
        const isMaxDisplay = (screenWidth < maxWidth);

        if (isMinDisplay || isMaxDisplay) {
            return <>{children}</>;
        }

        return null;
    }
}
