import React, { Component } from 'react';
import styled from 'styled-components';

const Div = styled.div`
    align-items: center;
    display: flex;
    max-width: 160px;
`;

const Progress = styled.progress`
    appearance: none;
    height: 4px;
    margin: 6px;
    min-width: 148px;

    &[value] {
        &::-moz-progress-bar {
            background-color: #36477F;
        }

        &::-webkit-progress-bar {
            background-color: #D9DDE2;
        }

        &::-webkit-progress-value {
            background-color: #36477F;
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
    background-color: #36477F;
    border-radius: 50%;
    display: inline-block;
    width: 16px;
`;

const PastStep = AbstractStep;

const CurrentStep = styled(AbstractStep)`
    border: 4px solid #D9DDE2;
    width: 8px;
`;

const FutureStep = styled(AbstractStep)`
    background-color: #D9DDE2;
`;

export default class progress extends Component {
    constructor(props) {
        super(props);

        this.steps = [0, 1, 2];

        this.renderStep = this.renderStep.bind(this);
    }

    renderStep(step) {
        const { max, value } = this.props;
        let Step;

        if (step < value) {
            Step = PastStep;
        } else if (step === value) {
            Step = CurrentStep;

            if (step === max) {
                Step = PastStep;
            }
        } else {
            Step = FutureStep;
        }

        return <Step key={step} />;
    }

    // renderSteps() {
    //     const { max } = this.props;
    // }

    render() {
        const { max, value } = this.props;
        return (
            <Div>
                <Progress max={max} value={value} />
                <UL>
                    {this.steps.map(step => this.renderStep(step))}
                </UL>
            </Div>
        );
    }
}
