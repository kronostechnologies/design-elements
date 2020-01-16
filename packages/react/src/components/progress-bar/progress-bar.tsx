import React, { ReactElement, ReactText } from 'react';

import styled from 'styled-components';
import { Bar } from '../bar/bar';
import { Theme } from '../theme-wrapper/theme-wrapper';

const Label = styled.label`
    color: ${(props: { theme: Theme }) => props.theme.greys.black};
    display: block;
    font-size: 0.875rem;
    letter-spacing: 0.46px;
    line-height: 1.5rem;
    margin-bottom: var(--spacing-half);
`;

const Container = styled.div`
    & + & {
        margin-top: var(--spacing-half);
    }
`;

interface Props {
    /** [0 - 100] */
    percent: number;
    color: string;
    /** End label */
    resultLabel: ReactText;
    /** Top label */
    descriptionLabel?: string;
}

export function ProgressBar({ color, descriptionLabel, resultLabel, percent }: Props): ReactElement {
    return (
        <Container>
            <Label>{descriptionLabel}</Label>
            <Bar
                color={color}
                endLabel={resultLabel}
                percent={percent}
            />
        </Container>
    );
}
