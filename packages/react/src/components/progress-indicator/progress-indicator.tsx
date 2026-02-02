import { ReactText, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { Bar } from './bar';

const Label = styled.label`
    color: ${({ theme }) => theme.component['progress-indicator-label-text-color']};
    display: block;
    font-size: 0.875rem;
    letter-spacing: 0.02875rem;
    line-height: 1.5rem;
    margin-bottom: var(--spacing-half);
`;

const Container = styled.div`
    & + & {
        margin-top: var(--spacing-half);
    }
`;

interface Props {
    className?: string;
    /** [0 - 100] */
    percent: number;
    color: string;
    /** End label */
    resultLabel: ReactText;
    /** Top label */
    descriptionLabel?: string;
}

export const ProgressIndicator: VoidFunctionComponent<Props> = ({
    className, color, descriptionLabel, resultLabel, percent,
}) => (
    <Container className={className}>
        <Label>{descriptionLabel}</Label>
        <Bar
            color={color}
            endLabel={resultLabel}
            percent={percent}
        />
    </Container>
);

ProgressIndicator.displayName = 'ProgressIndicator';
