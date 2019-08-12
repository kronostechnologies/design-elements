import React from 'react';
import styled from 'styled-components';

// Components
import Bar from './bar/bar';

const Label = styled.label`
  font-size: 0.875rem;
  color: ${props => (props.main ? 'rgb(0, 0, 0)' : 'rgb(87, 102, 110)')};
`;

const ProgressBar = ({ content }) => (
    <React.Fragment>
        {content.map(el => (
            <div>
                <Label main={el.main}>{el.label}</Label>
                <Bar
                    percent={el.percent}
                    color={el.color}
                    numbers={el.numbers}
                    main={el.main}
                />
            </div>
        ))}
    </React.Fragment>
);

export default ProgressBar;
