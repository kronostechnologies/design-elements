import { forwardRef, ReactElement, Ref } from 'react';
import { useId } from '../../hooks/use-id';
import { Legend } from './legend';
import { StyledFieldset } from './styled';
import { FieldsetProps } from './types';

export const Fieldset = forwardRef(({
    id: providedId,
    children,
    legend = { text: 'Default Legend' },
    disabled,
    ...props
}: FieldsetProps, ref: Ref<HTMLFieldSetElement>): ReactElement => {
    const id = useId(providedId);
    const { text, ...legendProps } = legend;

    return (
        <StyledFieldset
            data-testid="fieldset"
            id={id}
            aria-disabled={disabled}
            disabled={disabled}
            ref={ref}
            legend={legend}
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            <Legend
                {...legendProps /* eslint-disable-line react/jsx-props-no-spreading */}
                id={`${id}-legend`}
            >
                {text}
            </Legend>
            {children}
        </StyledFieldset>
    );
});
