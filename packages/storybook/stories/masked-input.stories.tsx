import { MaskedInput, type MaskedInputProps, useDateMask, usePostalCodeMask } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useCallback } from 'react';
import { rawCodeParameters } from './utils/parameters';

const MaskedInputMeta: Meta<typeof MaskedInput> = {
    title: 'Components/Masked Input',
    component: MaskedInput,
    args: {
        hint: 'Hint',
        label: 'Label',
    },
};

export default MaskedInputMeta;

type Story = StoryObj<typeof MaskedInput>;

export const Basic: Story = {
    ...MaskedInputMeta,
    render: (args) => (
        <MaskedInput
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...args}
            mask="_______"
            pattern={/^.{0,7}$/}
            hint="Enter 7 digits"
        />
    ),
};

export const PostalCodeMask: Story = {
    ...MaskedInputMeta,
    parameters: rawCodeParameters,
    render: (args) => {
        const postalCodeMask = usePostalCodeMask();
        return (
            <MaskedInput
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...postalCodeMask}
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...args}
            />
        );
    },
};

export const DateMask: Story = {
    ...MaskedInputMeta,
    parameters: rawCodeParameters,
    render: (args) => {
        const { dateMask, parseDate } = useDateMask({
            min: new Date(2000, 0, 1),
            max: new Date(2050, 11, 31),
            separator: '-',
            format: 'YYYY-MM-DD',
        });
        const handleChange: MaskedInputProps['onChange'] = useCallback((rawValue: string, formattedValue: string) => {
            console.info(rawValue, parseDate(formattedValue));
        }, [parseDate]);

        return (
            <MaskedInput
                onChange={handleChange}
                dateMask={dateMask}
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...args}
                hint="Enter a date between 2000-01-01 and 2050-12-31"
            />
        );
    },
};
