import { FC } from 'react';
import { StyledLegend } from './styled';
import { LegendProps } from './types';

export const Legend: FC<LegendProps> = ({
    children,
    size,
    bold,
    ...props
}) => {
    return (
        <StyledLegend
            datatest-id='legend'
            $size={size}
            $bold={bold}
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {children}
        </StyledLegend>
    );
};
