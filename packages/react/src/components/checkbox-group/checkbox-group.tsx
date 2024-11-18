import { ChangeEvent, useState, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { Checkbox } from '../checkbox/checkbox';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { useTranslation } from '../../i18n/use-translation';
import { v4 as uuid } from '../../utils/uuid';
import { Icon } from '../icon/icon';

const Legend = styled.legend`
    font-size: 0.75rem;
    line-height: 1.25rem;
    margin-bottom: var(--spacing-1x);
    padding: 0;
`;

const StyledIcon = styled(Icon)`
    align-self: center;
    display: flex;
    margin-right: var(--spacing-base);
`;

const ValidationErrorAlert = styled.div<{ label: string }>`
    align-items: flex-start;
    color: ${({ theme }) => theme.component['checkbox-error-border-color']};
    display: flex;
    margin: ${({ label }) => `${label ? 'calc(var(--spacing-1x) * -1) ' : '0'} 0 0 var(--spacing-1x) `};
    padding-bottom: var(--spacing-1x);
`;

interface CheckboxProps {
    id?: string;
    label?: string;
    checkedValues?: string[];
    required?: boolean;
    valid?: boolean;
    validationErrorMessage?: string;
    checkboxGroup: {
        label: string,
        name: string,
        value: string,
        defaultChecked?: boolean,
        disabled?: boolean,
    }[];

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export const CheckboxGroup: VoidFunctionComponent<CheckboxProps> = ({
    id,
    label,
    checkedValues,
    checkboxGroup,
    required,
    valid = true,
    validationErrorMessage,
    onChange,
    ...props
}) => {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('checkbox');
    const dataAttributes = useDataAttributes(props);
    const dataTestId = dataAttributes['data-testid'] ?? 'checkboxGroup';
    const validationAlertId = `${id || uuid()}_validationAlert`;
    const [checkedState, setCheckedState] = useState(
        new Array(checkboxGroup.length).fill(false),
    );
    const areAllCheckboxUnchecked = checkedState.every((e) => e === false);

    const handleOnChange = (position: number): void => {
        const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));

        setCheckedState(updatedCheckedState);
    };

    return (
        <>
            {label && <Legend>{label}</Legend>}
            {
                required && !valid && areAllCheckboxUnchecked
                && (
                    <ValidationErrorAlert id={validationAlertId} label={label || ''}>
                        <StyledIcon name="alertOctagon" size={isMobile ? '24' : '16'} />
                        {validationErrorMessage || t('validationErrorMessage')}
                    </ValidationErrorAlert>
                )
            }
            {checkboxGroup.map(({
                defaultChecked,
                disabled,
                label: checkboxLabel,
                name,
                value,
            }, pos) => (
                <Checkbox
                    key={`${name}-${value}`}
                    checked={checkedValues?.includes(value)}
                    data-testid={`${dataTestId}-${value}`}
                    defaultChecked={defaultChecked}
                    disabled={disabled}
                    isInGroup
                    label={checkboxLabel}
                    name={name}
                    required={required}
                    valid={valid}
                    value={value}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        handleOnChange(pos);
                        onChange?.(event);
                    }}
                />
            ))}
        </>
    );
};
