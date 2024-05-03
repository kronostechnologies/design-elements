import { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { LoggingErrorBoundary } from './LoggingErrorBoundary.component';

type ErrorBoundaryProps = PropsWithChildren<{
    fallback: ReactElement;
}>;

export const ErrorBoundary: FunctionComponent<ErrorBoundaryProps> = ({
    children,
    fallback,
}) => (
    <LoggingErrorBoundary fallback={fallback}>
        {children}
    </LoggingErrorBoundary>
);
