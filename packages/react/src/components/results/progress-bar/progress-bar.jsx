import React from 'react';
import styled from 'styled-components';

import Bar from './bar/bar';

const Label = styled.label`
  color: ${props => (props.main ? 'rgb(0, 0, 0)' : 'rgb(87, 102, 110)')};
  font-size: 0.875rem;
`;

const ProgressBar = ({ content }) => (
    <React.Fragment>
        {content.map(el => (
            <div>
                <Label>{el.descriptionLabel}</Label>
                <Bar
                    color1={el.color1}
                    color2={el.color2}
                    endLabel={el.endLabel}
                    percent={el.percent}
                />
            </div>
        ))}
    </React.Fragment>
);

export default ProgressBar;
