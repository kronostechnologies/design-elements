import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';

interface LoggingErrorBoundaryState {
    error?: Error;
}

export type LoggingErrorBoundaryProps = PropsWithChildren<{
    fallback: ReactNode;
}>;

export class LoggingErrorBoundary extends Component<LoggingErrorBoundaryProps, LoggingErrorBoundaryState> {
    constructor(props: LoggingErrorBoundaryProps) {
        super(props);

        this.state = {};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error(error, errorInfo);
        this.setState({ error });
    }

    render(): ReactNode {
        if (this.state.error) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}
