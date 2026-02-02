import { forwardRef, ReactElement, Ref } from 'react';
import { useId } from '../../hooks/use-id';
import { Legend } from './legend';
import { StyledFieldset } from './styled';
import { FieldsetProps } from './types';

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
