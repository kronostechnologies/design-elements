import React from 'react';
import styled from 'styled-components';

import Bar from './bar/bar';

const Label = styled.label`
  color: ${props => (props.secondary ? 'rgb(87, 102, 110)' : 'rgb(0, 0, 0)')};
  font-size: 0.875rem;
`;

const ProgressBar = ({ content }) => (
    <React.Fragment>
        {content.map(el => (
            <div>
                <Label secondary={el.secondary}>{el.descriptionLabel}</Label>
                <Bar
                    color={el.color}
                    endLabel={el.endLabel}
                    percent={el.percent}
                    secondary={el.secondary}
                />
            </div>
        ))}
    </React.Fragment>
);

export default ProgressBar;
