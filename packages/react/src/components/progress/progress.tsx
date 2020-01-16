import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Div = styled.div`
    align-items: center;
    display: flex;
    max-width: 160px;
`;

const StyledProgress = styled.progress`
    appearance: none;
    height: 4px;
    margin: 6px;
    min-width: 148px;

    &[value] {
        &::-moz-progress-bar {
            background-color: ${props => props.theme.main['primary-3']};
        }

        &::-webkit-progress-bar {
            background-color: ${props => props.theme.greys.grey};
        }

        &::-webkit-progress-value {
            background-color: ${props => props.theme.main['primary-3']};
        }
    }
`;

const UL = styled.ul`
    display: flex;
    height: 16px;
    justify-content: space-between;
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 160px;
`;

const AbstractStep = styled.li`
    background-color: ${props => props.theme.main['primary-3']};
    border-radius: 50%;
    display: inline-block;
    width: 16px;
`;

const PastStep = AbstractStep;

const CurrentStep = styled(AbstractStep)`
    border: 4px solid ${props => props.theme.greys.grey};
    width: 8px;
`;

const FutureStep = styled(AbstractStep)`
    background-color: ${props => props.theme.greys.grey};
`;

const range = (value: number) => {
    const array = [];
    if (value >= 0) {
        for (let i = 0; i < value; i++) {
            array.push(i);
        }
    } else {
        for (let i = 0; i > value; i--) {
            array.push(i);
        }
    }
    return array;
};

interface GetStepProps {
    step: number;
    max: number;
    value: number;
}

interface ProgressProps {
    /** Progress max steps */
    max: number;
    /** Progress current step */
    value: number;
}

const getStep = ({ step, max, value }: GetStepProps): ReactElement => {
    let StepComponent;

    if (step < value) {
        StepComponent = PastStep;
    } else if (step === value) {
        StepComponent = CurrentStep;

        if (step === max) {
            StepComponent = PastStep;
        }
    } else {
        StepComponent = FutureStep;
    }

    return <StepComponent key={step} />;
};

export function Progress({ max, value }: ProgressProps): ReactElement {
    return (
        <Div>
            <StyledProgress max={max} value={value} />
            <UL>
                {range(max + 1).map((step: number) => getStep({ step, max, value }))}
            </UL>
        </Div>
    );
}
