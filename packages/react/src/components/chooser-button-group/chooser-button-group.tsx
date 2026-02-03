import { type FC, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { ChooserButton } from '../chooser-button';

export interface ChooserButtonOption {
    label: string;
    value?: string
}

export interface ChooserButtonGroupProps {
    groupName: string;
    options: ChooserButtonOption[];
    /** Optional button to allow user to skip question */
    skipOption?: ChooserButtonOption;
    /** Set inputs in columns layout */
    inColumns?: boolean;
    /** Only use if you want to control input value externally */
    value?: string | null;

    onChange?(option: ChooserButtonOption): void;
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

export const ChooserButtonGroup: FC<ChooserButtonGroupProps> = ({
    inColumns,
    groupName,
    onChange,
    options,
    skipOption,
    value,
    ...props
}) => {
    const dataAttributes = useDataAttributes(props);
    const dataTestId = dataAttributes['data-testid'] ?? 'chooser-button-group';
    const [isControlled] = useState(value !== undefined);

    const handleChange = useCallback((option: ChooserButtonOption): void => {
        if (onChange) {
            onChange(option);
        }
    }, [onChange]);

    const chooserOptions = useMemo(() => options.map((option) => (
        <ChooserButton
            key={option.value}
            groupName={groupName}
            onChange={() => handleChange(option)}
            type="radio"
            checked={isControlled ? value === option.value : undefined}
            value={option.value}
        >
            {option.label}
        </ChooserButton>
    )), [groupName, handleChange, isControlled, options, value]);

    return (
        <>
            <Grid inColumns={inColumns}>
                {chooserOptions}
            </Grid>

            {skipOption && (
                <Skip>
                    <ChooserButton
                        data-testid={`${dataTestId}-${skipOption.value}`}
                        groupName={groupName}
                        onChange={() => handleChange(skipOption)}
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
};

ChooserButtonGroup.displayName = 'ChooserButtonGroup';
