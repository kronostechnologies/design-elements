import { FC } from 'react';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { StyledLegend } from './styled';
import { LegendProps } from './types';

export const Legend: FC<LegendProps> = ({
    children,
    size,
    disabled,
    bold,
    ...props
}) => {
    const { isMobile } = useDeviceContext();

    return (
        <StyledLegend
            datatest-id='legend'
            $size={size}
            $disabled={disabled}
            $bold={bold}
            $isMobile={isMobile}
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {children}
        </StyledLegend>
    );
};
