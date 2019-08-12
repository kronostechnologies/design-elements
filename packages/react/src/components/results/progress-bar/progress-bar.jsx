import React from 'react';
import styled from 'styled-components';

// Components
import Bar from './bar/bar';

const Label = styled.label`
  font-size: 0.875rem;
  color: ${props => (props.main ? '#000000' : '#57666e')};
`;

const ProgressBar = ({ main, label, percent, color, numbers }) => (
    <div>
        <Label main={main}>{label}</Label>
        <Bar
            percent={percent}
            color={color}
            numbers={numbers}
            main={main}
        />
    </div>
);

export default ProgressBar;
