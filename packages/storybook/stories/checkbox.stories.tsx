import { Checkbox, CheckboxProps } from '@equisoft/design-elements-react';
import { Meta } from '@storybook/react';
import { FunctionComponent } from 'react';

// eslint-disable-next-line react/jsx-props-no-spreading
export const Default: FunctionComponent<CheckboxProps> = (props) => <Checkbox {...props} />;

const CheckboxMeta: Meta<typeof Default> = {
    title: 'Components/Checkbox',
    component: Default,
    args: {
        label: 'Send by email',
    },
    argTypes: {
        onChange: {
            control: { disable: true },
        },
    },
    render: (args) => (
        <Default
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
            data-testid="some-checkbox-data-testid"
        />
    ),
};

export default CheckboxMeta;
