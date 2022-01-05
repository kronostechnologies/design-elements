import { ReactElement } from 'react';
import styled from 'styled-components';
import { clamp, toInt } from '../../utils/math';

const Container = styled.div`
    position: relative;
    width: 100%;
`;

function getHalfStepLength(props: JSX.IntrinsicElements['progress']): number {
    return 50 / (toInt(props.max, 1) + 1);
}

const StyledProgress = styled.progress`
    appearance: none;
    background-color: ${(props) => props.theme.greys.grey};
    border: none;
    bottom: 1.5rem;
    color: ${(props) => props.theme.main['primary-3']};
    height: 4px;
    left: ${getHalfStepLength}%;
    position: absolute;
    width: ${(props) => `${100 - (2 * getHalfStepLength(props))}%`};

    &[value] {
        &::-moz-progress-bar {
            background-color: ${(props) => props.theme.main['primary-3']};
        }

        &::-webkit-progress-bar {
            background-color: ${(props) => props.theme.greys.grey};
        }

        &::-webkit-progress-value {
            background-color: ${(props) => props.theme.main['primary-3']};
        }
    }
`;

const Steps = styled.ol`
    counter-reset: step;
    display: grid;
    grid-auto-columns: unset;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(1rem, 1fr));
    margin: 0;
    padding: 0;
`;

const Step = styled.li`
    color: ${(props) => props.theme.main['primary-3']};
    display: flex;
    flex-direction: column;
    font-weight: var(--font-bold);
    justify-content: flex-end;
    position: relative;
    text-align: center;

    ::after {
        align-items: center;
        background-color: ${(props) => props.theme.greys.white};
        border: 0.25rem solid;
        border-radius: 50%;
        box-sizing: border-box;
        content: counter(step);
        counter-increment: step;
        display: flex;
        height: 32px;
        justify-content: center;
        line-height: 2rem;
        margin: 0 auto 0.625rem;
        text-align: center;
        width: 32px;
    }

    > span {
        color: ${(props) => props.theme.greys.black};
        font-size: 0.75rem;
        font-weight: var(--font-normal);
        letter-spacing: 0.0125rem;
        line-height: 1.25rem;
        margin-bottom: var(--spacing-1x);
    }
`;

const PastStep = styled(Step)`
    ::after {
        background-color: ${(props) => props.theme.main['primary-3']};
        border-color: ${(props) => props.theme.main['primary-3']};
        color: ${(props) => props.theme.greys.white};
    }

    > span {
        color: ${(props) => props.theme.greys['dark-grey']};
    }
`;

const CurrentStep = styled(Step).attrs({ 'aria-current': 'step' })`
    color: ${(props) => props.theme.main['primary-3']};

    ::after {
        border-color: ${(props) => props.theme.main['primary-3']};
    }

    span {
        color: ${(props) => props.theme.main['primary-3']};
        font-weight: var(--font-bold);
    }
`;

const FutureStep = styled(Step)`
    ::after {
        border-color: ${(props) => props.theme.greys.grey};
        color: ${(props) => props.theme.greys['dark-grey']};
    }
`;

export interface ProgressStep {
    label?: string;
}

interface ProgressProps {
    className?: string;
    steps: ProgressStep[];
    value: number;
}

function renderStep(step: ProgressStep, stepIndex: number, value: number): ReactElement {
    let StepComponent;
    let dataTestId: string;

    if (stepIndex < value) {
        dataTestId = 'progress-step-past';
        StepComponent = PastStep;
    } else if (stepIndex === value) {
        dataTestId = 'progress-step-current';
        StepComponent = CurrentStep;
    } else {
        dataTestId = 'progress-step-future';
        StepComponent = FutureStep;
    }

    return (
        <StepComponent key={stepIndex} data-testid={dataTestId}>
            <span>{step.label}</span>
        </StepComponent>
    );
}

export function Progress({ className, steps, value }: ProgressProps): ReactElement {
    const max = steps.length;
    const zeroBasedValue = clamp(value, 1, max) - 1;

    return (
        <Container className={className}>
            <StyledProgress max={max - 1} value={zeroBasedValue} />
            <Steps data-testid="progress-steps">
                {steps.map((step, stepIndex: number) => renderStep(step, stepIndex, zeroBasedValue))}
            </Steps>
        </Container>
    );
}
