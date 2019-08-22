import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { ChooseInput } from './controls/choose-input';

type GridProps = Pick<ChooserProps, 'inColumns'>;
const Grid = styled.div<GridProps>`
  align-items: stretch;
  box-sizing: border-box;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: ${(props: GridProps) => props.inColumns ? 'repeat(auto-fit, minmax(8.75rem, 1fr))' : 'none'};
  width: auto;
`;

const Skip = styled.div`
  margin: 1rem 0 0;
`;

interface ChooserOption {
    label?: string;
    value?: string;
}

interface ChooserProps {
    inColumns?: boolean;
    groupName: string;
    options: ChooserOption[];
    skipLabel?: string;
    skipValue?: string;
    value?: string;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

const Chooser = ({ inColumns, groupName, onChange, options, skipValue, skipLabel, value }: ChooserProps) => {
    const [isControlled] = useState(value !== undefined);

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        if (onChange) {
            onChange(event);
        }
    }

    const chooserOptions = options.map((option) => (
        <ChooseInput
            key={option.value}
            groupName={groupName}
            onChange={handleChange}
            type="radio"
            checked={isControlled ? value === option.value : undefined}
            value={option.value}
        >
            {option.label}
        </ChooseInput>
    ));

    const skipButton = (skipValue && skipLabel && (
        <Skip>
            <ChooseInput
                groupName={groupName}
                onChange={handleChange}
                type="radio"
                checked={isControlled ? value === skipValue : undefined}
                value={skipValue}
            >
                {skipLabel}
            </ChooseInput>
        </Skip>
    ));

    return (
        <>
            <Grid inColumns={inColumns}>
                {chooserOptions}
            </Grid>

            {skipButton}
        </>
    );
};

export { Chooser };
