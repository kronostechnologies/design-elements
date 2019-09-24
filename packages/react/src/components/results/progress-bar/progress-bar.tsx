import React, { ReactElement, ReactText } from 'react';
import styled from 'styled-components';

import { Bar } from './bar/bar';

const Label = styled.label`
  color: ${(props: { secondary: boolean }) => (props.secondary ? 'rgb(87, 102, 110)' : 'rgb(0, 0, 0)')};
  font-size: 0.875rem;
`;

interface Props {
    color: string;
    /** Top label */
    descriptionLabel?: string;
    /** End label */
    resultLabel: ReactText;
    percent: number;
    /**
   * Sets a lighter font color
   *
   * @default NULL
   **/
    secondary?: boolean;
}

export function ProgressBar({ color, descriptionLabel, resultLabel, percent, secondary }: Props): ReactElement {
    return (
        <div>
            <Label secondary={secondary || false}>{descriptionLabel}</Label>
            <Bar
                color={color}
                endLabel={resultLabel}
                percent={percent}
                secondary={secondary || false}
            />
        </div>
    );
}
