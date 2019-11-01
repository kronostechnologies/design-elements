import React, { ReactElement, ReactText } from 'react';

import styled from 'styled-components';
import { Bar } from '../bar/bar';
import { Theme } from '../theme-wrapper/theme-wrapper';

const Label = styled.label`
  color: ${(props: {theme: Theme, secondary: boolean}) => (props.secondary ? props.theme.greys['dark-grey'] : props.theme.greys.black)};
  font-size: 0.875rem;
`;

interface Props {
    /** [0 - 100] */
    percent: number;
    color: string;
    /** End label */
    resultLabel: ReactText;
    /** Top label */
    descriptionLabel?: string;
    /** Sets a lighter font color */
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
