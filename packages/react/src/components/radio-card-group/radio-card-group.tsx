import React, { ReactElement, useMemo, VoidFunctionComponent } from 'react';
import { RadioCardProps, isRadioCard } from './radio-card';
import { Fieldset, Legend } from './styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

interface RadioCardGroupProps {
    children: ReactElement<RadioCardProps> | ReactElement<RadioCardProps>[];
    className?: string,
    label?: string;
    orientation?: 'horizontal' | 'vertical';
}

export const RadioCardGroup: VoidFunctionComponent<RadioCardGroupProps> = ({
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
