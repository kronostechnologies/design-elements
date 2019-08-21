import React from 'react';
import styled from 'styled-components';

import { Bar } from './bar/bar';

const Label = styled.label`
  color: ${(props: {secondary: boolean}) => (props.secondary ? 'rgb(87, 102, 110)' : 'rgb(0, 0, 0)')};
  font-size: 0.875rem;
`;

interface ProgressBarProp {
    color: string;
    descriptionLabel: string;
    endLabel: string;
    percent: string;
    secondary?: boolean;
}

interface ProgressBarProps {
    content: ProgressBarProp[];
}

const ProgressBar = ({ content }: ProgressBarProps) => (
    <React.Fragment>
        {content.map((el) => (
            <div>
                <Label secondary={el.secondary || false}>{el.descriptionLabel}</Label>
                <Bar
                    color={el.color}
                    endLabel={el.endLabel}
                    percent={el.percent}
                    secondary={el.secondary || false}
                />
            </div>
        ))}
    </React.Fragment>
);

export { ProgressBar };
