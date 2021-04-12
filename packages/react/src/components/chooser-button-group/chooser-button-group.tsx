import React, { ChangeEvent, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { ChooserButton } from '../chooser-button/chooser-button';

interface ChooserButtonGroupProps {
    groupName: string;
    options: { label: string; value?: string }[];
    /** Optional button to allow user to skip question */
    skipOption?: { label: string; value?: string };
    /** Set inputs in columns layout */
    inColumns?: boolean;
    /** Only use if you want to control input value externally */
    value?: string | null;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

type GridProps = Pick<ChooserButtonGroupProps, 'inColumns'>;

function getGridTemplateColumns({ inColumns }: GridProps): string {
    return inColumns ? 'repeat(auto-fit, minmax(8.75rem, 1fr))' : 'none';
}

const Grid = styled.div<GridProps>`
    align-items: stretch;
    box-sizing: border-box;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: ${getGridTemplateColumns};
    width: auto;
`;

const Skip = styled.div`
    margin: var(--spacing-2x) 0 0;
`;

export function ChooserButtonGroup({
    inColumns, groupName, onChange, options, skipOption, value,
}: ChooserButtonGroupProps): ReactElement {
    const [isControlled] = useState(value !== undefined);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (onChange) {
            onChange(event);
        }
    };

    const chooserOptions = options.map((option) => (
        <ChooserButton
            key={option.value}
            groupName={groupName}
            onChange={handleChange}
            type="radio"
            checked={isControlled ? value === option.value : undefined}
            value={option.value}
        >
            {option.label}
        </ChooserButton>
    ));

    return (
        <>
            <Grid inColumns={inColumns}>
                {chooserOptions}
            </Grid>

            {skipOption && (
                <Skip>
                    <ChooserButton
                        groupName={groupName}
                        onChange={handleChange}
                        type="radio"
                        checked={isControlled ? value === skipOption.value : undefined}
                        value={skipOption.value}
                    >
                        {skipOption.label}
                    </ChooserButton>
                </Skip>
            )}
        </>
    );
}
