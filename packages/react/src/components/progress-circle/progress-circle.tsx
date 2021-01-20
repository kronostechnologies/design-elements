import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Theme } from '../../themes';
import { Circle } from '../circle/circle';

const RADIUS = 62;
const STROKE = 8;

interface ResultProps {
    theme: Theme;
    secondary?: boolean;
}

const Container = styled.div`
    display: inline-block;
    height: auto;
    width: 100%;
`;

const Wrapper = styled.div`
    height: inherit;
    margin-bottom: var(--spacing-1x);
    position: relative;
    width: inherit;
`;

const Result = styled.div`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;

    p {
        color: ${(props: ResultProps) => props.theme.greys.black};
        font-size: 1.5rem;
        margin: 0;
        padding: 0;
    }
`;

const Label = styled.p`
    color: ${(props: ResultProps) => props.theme.greys.black};
    font-size: 1rem;
    letter-spacing: 0.46px;
    line-height: 1.5rem;
    margin: 0;
    padding: 0;
    text-align: center;
`;

const StyledCircle = styled(Circle)`
    height: auto;
    min-height: 124px;
    width: 100%;
`;

interface Props {
    color: string;
    /** Bottom label */
    descriptionLabel?: string;
    percent: number;
    /** Center label */
    resultLabel: string | number;
}

// Source: https://css-tricks.com/building-progress-ring-quickly/
export function ProgressCircle({
    color, descriptionLabel, percent, resultLabel,
}: Props): ReactElement {
    return (
        <Container>
            <Wrapper>
                <StyledCircle
                    radius={RADIUS}
                    stroke={STROKE}
                    percent={percent}
                    color={color}
                />
                <Result>
                    <p>{resultLabel}</p>
                </Result>
            </Wrapper>
            {descriptionLabel && <Label>{descriptionLabel}</Label>}
        </Container>
    );
}
