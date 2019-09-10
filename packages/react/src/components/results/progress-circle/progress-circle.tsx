import React, { ReactElement, ReactText } from 'react';
import styled from 'styled-components';

import { Circle } from './circle/circle';

const RADIUS = 73;
const STROKE = 8;

function getColor(secondary: boolean | undefined): string {
    return secondary ? 'rgb(87,102,110)' : 'rgb(0, 0, 0)';
}

interface ResultProps extends Pick<Props, 'secondary'> {
}

const Container = styled.div`
    display: inline-block;
`;

const Wrapper = styled.div`
    height: ${(RADIUS * 2) / 16}rem;
    position: relative;
    width: ${(RADIUS * 2) / 16}rem;
`;

const Result = styled.div`
    align-items: center;
    display: flex;
    height: ${(RADIUS * 2) / 16}rem;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: ${(RADIUS * 2) / 16}rem;
    p {
        color: ${(props: ResultProps) => getColor(props.secondary)};
        font-size: 1.625rem;
    }
`;

const Label = styled.p`
    color: ${(props: ResultProps) => getColor(props.secondary)};
    text-align: center;
    width: ${(RADIUS * 2) / 16}rem;
`;

interface Props {
    color: string;
    descriptionLabel?: string;
    resultLabel: ReactText;
    percent: number;
    secondary?: boolean;
}

// Source: https://css-tricks.com/building-progress-ring-quickly/
export function ProgressCircle({ color, descriptionLabel, percent, resultLabel, secondary }: Props): ReactElement {
    return (
        <Container>
            <Wrapper>
                <Circle
                    radius={RADIUS}
                    stroke={STROKE}
                    percent={percent}
                    color={color}
                />
                <Result secondary={secondary}>
                    <p>{resultLabel}</p>
                </Result>
            </Wrapper>
            {descriptionLabel && <Label secondary={secondary}>{descriptionLabel}</Label>}
        </Container>
    );
}
