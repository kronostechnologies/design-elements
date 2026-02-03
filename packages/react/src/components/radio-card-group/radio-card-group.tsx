import React, { type FC, ReactElement, useMemo } from 'react';
import { useDeviceContext } from '../device-context-provider';
import { isRadioCard, RadioCardProps } from './radio-card';
import { Fieldset, Legend } from './styled-components';

export interface RadioCardGroupProps {
    children: ReactElement<RadioCardProps> | ReactElement<RadioCardProps>[];
    className?: string,
    label?: string;
    orientation?: 'horizontal' | 'vertical';
}

export const RadioCardGroup: FC<RadioCardGroupProps> = ({
    children,
    className,
    orientation = 'vertical',
    label,
}) => {
    const { isMobile } = useDeviceContext();
    const radioCards = useMemo(() => React.Children.toArray(children).filter(isRadioCard), [children]);

    return (
        <Fieldset className={className} horizontal={orientation === 'horizontal'}>
            <Legend isMobile={isMobile}>
                {label}
            </Legend>
            {radioCards}
        </Fieldset>
    );
};

RadioCardGroup.displayName = 'RadioCardGroup';
