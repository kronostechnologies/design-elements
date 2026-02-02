import { VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { Circle } from './circle';

const RADIUS = 62;
const STROKE = 8;

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
        color: ${({ theme }) => theme.component['progress-circle-result-text-color']};
        font-size: 1.5rem;
        margin: 0;
        padding: 0;
    }
`;

const Label = styled.p`
    color: ${({ theme }) => theme.component['progress-circle-label-text-color']};
    font-size: 1rem;
    letter-spacing: 0.02875rem;
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
    className?: string;
    color: string;
    /** Bottom label */
    descriptionLabel?: string;
    percent: number;
    /** Center label */
    resultLabel: string | number;
}

// Source: https://css-tricks.com/building-progress-ring-quickly/
export const ProgressCircle: VoidFunctionComponent<Props> = ({
    className, color, descriptionLabel, percent, resultLabel,
}) => (
    <Container className={className}>
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

ProgressCircle.displayName = 'ProgressCircle';
