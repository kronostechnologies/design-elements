import React from 'react';
import styled from 'styled-components';
import range from 'lodash-es/range';

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
      background-color: #36477f;
    }

    &::-webkit-progress-bar {
      background-color: #d9dde2;
    }

    &::-webkit-progress-value {
      background-color: #36477f;
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
  background-color: #36477f;
  border-radius: 50%;
  display: inline-block;
  width: 16px;
`;

const PastStep = AbstractStep;

const CurrentStep = styled(AbstractStep)`
  border: 4px solid #d9dde2;
  width: 8px;
`;

const FutureStep = styled(AbstractStep)`
  background-color: #d9dde2;
`;

const getStep = (step, max, value) => {
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

const Progress = ({ max, value }) => (
    <Div>
        <StyledProgress max={max} value={value} />
        <UL>
            {range(max + 1).map(step => getStep(step, max, value))}
        </UL>
    </Div>
);

export default Progress;
