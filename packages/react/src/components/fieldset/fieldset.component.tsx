import { forwardRef, ReactElement, Ref } from 'react';
import { Legend } from './legend.component';
import { StyledFieldset } from './styled';
import { FieldsetProps } from './types';

export const Fieldset = forwardRef(({
    children,
    orientation = 'vertical',
    legend,
    disabled,
    ...props
}: FieldsetProps, ref: Ref<HTMLFieldSetElement>): ReactElement => (
    <StyledFieldset
        orientation={orientation}
        aria-orientation={orientation}
        ref={ref}
        {...props /* eslint-disable-line react/jsx-props-no-spreading */}
    >
        {legend && (
            <Legend
                disabled={disabled}
                {...legend /* eslint-disable-line react/jsx-props-no-spreading */}
            >
                {legend.text}
            </Legend>
        )}
        {children}
    </StyledFieldset>
));
