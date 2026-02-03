import { FieldsetHTMLAttributes, forwardRef, ReactElement, ReactNode, Ref } from 'react';
import styled from 'styled-components';
import { useId } from '../../hooks/use-id';
import { Legend, type LegendProps } from './legend';

type BaseFieldsetProps = Pick<FieldsetHTMLAttributes<HTMLFieldSetElement>,
    'disabled' | 'id' | 'aria-disabled' | 'aria-label' | 'role'
>;

export type FieldsetOrientation = 'horizontal' | 'vertical';

export type FieldsetLegendProps = Omit<LegendProps, 'children'> & { text: string };

export interface FieldsetProps extends BaseFieldsetProps {
    legend?: FieldsetLegendProps;
    orientation?: FieldsetOrientation;
    children: ReactNode;
}

export const StyledFieldset = styled.fieldset<{
    $orientation: FieldsetProps['orientation'],
}>`
    border: 0;
    border: none;
    display: flex;
    flex-direction: ${({ $orientation }) => ($orientation === 'horizontal' ? 'row' : 'column')};
    gap: var(--spacing-1x);
    margin: 0;
    min-inline-size: 0;
    min-width: 0;
    padding: 0;

    &:disabled,
    &[aria-disabled='true'] {
        legend {
            color: ${({ theme }) => theme.component['legend-disabled-text-color']};
        }
    }
`;

export const Fieldset = forwardRef(({
    id: providedId,
    children,
    orientation = 'vertical',
    legend,
    disabled,
    ...props
}: FieldsetProps, ref: Ref<HTMLFieldSetElement>): ReactElement => {
    const id = useId(providedId);
    const { text, ...legendProps } = legend || {};

    return (
        <StyledFieldset
            data-testid="fieldset"
            id={id}
            $orientation={orientation}
            data-orientation={orientation}
            aria-disabled={disabled}
            disabled={disabled}
            ref={ref}
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {legend && (
                <Legend
                    {...legendProps /* eslint-disable-line react/jsx-props-no-spreading */}
                    id={`${id}-legend`}
                >
                    {text}
                </Legend>
            )}
            {children}
        </StyledFieldset>
    );
});

Fieldset.displayName = 'Fieldset';
