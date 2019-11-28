import React, { ChangeEvent, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { ChooseInput } from '../choose-input/choose-input';

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
  margin: var(--spacing-2x) 0 0;
`;

interface ChooserProps {
    groupName: string;
    options: {label: string; value?: string}[];
    /** Optional button to allow user to skip question */
    skipOption?: {label: string; value?: string};
    /** Set inputs in columns layout */
    inColumns?: boolean;
    /** Only use if you want to control input value externally */
    value?: string | null;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export function Chooser({ inColumns, groupName, onChange, options, skipOption, value }: ChooserProps): ReactElement {
    const [isControlled] = useState(value !== undefined);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (onChange) {
            onChange(event);
        }
    };

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

    return (
        <>
            <Grid inColumns={inColumns}>
                {chooserOptions}
            </Grid>

            {skipOption && (
                <Skip>
                    <ChooseInput
                        groupName={groupName}
                        onChange={handleChange}
                        type="radio"
                        checked={isControlled ? value === skipOption.value : undefined}
                        value={skipOption.value}
                    >
                        {skipOption.label}
                    </ChooseInput>
                </Skip>
            )}
        </>
    );
}
