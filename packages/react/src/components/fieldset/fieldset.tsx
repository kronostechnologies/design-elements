import { forwardRef, ReactElement, Ref } from 'react';
import { useId } from '../../hooks/use-id';
import { Legend } from './legend';
import { StyledFieldset } from './styled';
import { FieldsetProps } from './types';

export const Fieldset = forwardRef(({
    id: providedId,
    children,
    legend,
    disabled,
    ...props
}: FieldsetProps, ref: Ref<HTMLFieldSetElement>): ReactElement => {
    const id = useId(providedId);
    const legendProps = typeof legend === 'string' 
      ? { text: legend }
      : legend;

    return (
        <StyledFieldset
            data-testid="fieldset"
            id={id}
            aria-disabled={disabled}
            disabled={disabled}
            ref={ref}
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            <Legend
                id={`${id}-legend`}
                {...legendProps}
            >
                {legendProps.text}
            </Legend>
            {children}
        </StyledFieldset>
    );
});
