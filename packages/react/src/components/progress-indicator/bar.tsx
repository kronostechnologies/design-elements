import { ReactText, VoidFunctionComponent } from 'react';
import styled from 'styled-components';

interface BarProps {
    className?: string;
    color: string;
    percent: number;
    endLabel: ReactText;
}

const Container = styled.div`
    p {
        color: ${({ theme }) => theme.component['progress-indicator-label-text-color']};
        letter-spacing: 0.02875rem;
        line-height: 1.5rem;
        margin: 0;
        text-align: right;
    }
`;

const Progress = styled.div`
    background-color: ${({ theme }) => theme.component['progress-indicator-empty-track-color']};
    border-radius: var(--border-radius);
    height: 0.5rem;
    margin-bottom: var(--spacing-half);
    width: 100%;
`;

const StyledBar = styled.div<Omit<BarProps, 'endLabel'>>`
    background: ${({ color }) => color};
    border-radius: var(--border-radius);
    height: 0.5rem;
    width: ${({ percent }) => Math.min(Math.max(percent, 0), 100)}%;
`;

export const Bar: VoidFunctionComponent<BarProps> = ({
    className, color, percent, endLabel,
}) => (
    <Container className={className}>
        <Progress>
            <StyledBar color={color} percent={percent} />
        </Progress>
        <p>{endLabel}</p>
    </Container>
);

Bar.displayName = 'Bar';
