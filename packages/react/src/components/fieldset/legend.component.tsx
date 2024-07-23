import { FC } from 'react';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { StyledLegend } from './styled';
import { LegendProps } from './types';

export const Legend: FC<LegendProps> = ({ children, ...props }) => {
    const { isMobile } = useDeviceContext();

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <StyledLegend datatest-id='legend' {...props} isMobile={isMobile}>
            {children}
        </StyledLegend>
    );
};
