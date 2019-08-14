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
                <Label main={el.main}>{el.label}</Label>
                <Bar
                    percent={el.percent}
                    color1={el.color1}
                    color2={el.color2}
                    numbers={el.numbers}
                    main={el.main}
                />
            </div>
        ))}
    </React.Fragment>
);

export default ProgressBar;
