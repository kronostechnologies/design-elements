import { Button, DateMaskedInput, type DateMaskedInputProps } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

const DateMaskedInputMeta: Meta<typeof DateMaskedInput> = {
    title: 'Components/Date Masked Input',
    component: DateMaskedInput,
    args: {
        format: 'yyyy-mm-dd',
        hint: 'Hint',
        label: 'Label',
    },
};

export default DateMaskedInputMeta;

type Story = StoryObj<typeof DateMaskedInput>;

export const DateMask: Story = {
    ...DateMaskedInputMeta,
    parameters: rawCodeParameters,
    render: (args) => {
        const handleChange: DateMaskedInputProps['onChange'] = useCallback((date, rawValue, formattedValue) => {
            console.info(date, rawValue, formattedValue);
        }, []);

        return (
            <DateMaskedInput
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                onChange={handleChange}
            />
        );
    },
};

export const ControlledDateMask: Story = {
    ...DateMaskedInputMeta,
    parameters: rawCodeParameters,
    render: (args) => {
        const [value, setValue] = useState<Date | string>('');
        const handleChange: DateMaskedInputProps['onChange'] = useCallback((date, rawValue, formattedValue) => {
            console.info(date, rawValue, formattedValue);
            setValue(date ?? formattedValue);
        }, []);

        return (
            <>
                <Button buttonType="primary" onClick={() => setValue(new Date())}>Set to today</Button>
                <DateMaskedInput
                    {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                    onChange={handleChange}
                    value={value}
                />
            </>
        );
    },
};
