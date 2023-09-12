import React, { ReactElement, VoidFunctionComponent } from 'react';

import { RadioCard, RadioCardProps } from './radio-card';
import { Fieldset, Legend } from './styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

interface RadioCardGroupProps {
    children: ReactElement<RadioCardProps> | ReactElement<RadioCardProps>[];
    label?: string;
}

export const RadioCardGroup : VoidFunctionComponent<RadioCardGroupProps> = ({
    children,
    label,
}) => {
    const { isMobile } = useDeviceContext();

    return (
        <Fieldset>
            <Legend isMobile={isMobile}>
                {label}
            </Legend>
            {React.Children.toArray(children).filter((child) => (
                React.isValidElement<RadioCardProps>(child)
                && child.type === RadioCard
            ))}
        </Fieldset>
    );
};
