import React, { ChangeEvent, ReactElement, useState } from 'react';
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
    label: string;
    value?: string;
}

interface ChooserProps {
    /**
   * Sets the elements in columns
   *
   * @default NULL
   **/
    inColumns?: boolean;
    /** Sets input names */
    groupName: string;
    /** ChooserOption: { label: string; value?: string; } */
    options: ChooserOption[];
    /**
   * Sets properties for the skip button
   *
   * @default NULL
   **/
    skipOption?: ChooserOption;
    /** Sets initial value */
    value?: string | null;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export function Chooser({ inColumns, groupName, onChange, options, skipOption, value }: ChooserProps): ReactElement {
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
