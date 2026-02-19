import { ViewControl, type ViewControlOption } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';

const meta: Meta<typeof ViewControl> = {
    title: 'Components/View Control',
    component: ViewControl,
    args: {
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
            { label: 'Option 4', value: 'option4' },
        ] satisfies ViewControlOption[],
    },
};

export default meta;

type Story = StoryObj<typeof ViewControl>;

const DefaultViewControl = styled(ViewControl)`
    min-width: 120px;
`;

export const Default: Story = {
    render: (args) => {
        const [value, setValue] = useState<string>('option1');
        return (
            <DefaultViewControl
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                onChange={setValue}
                value={value}
            />
        );
    },
};

const ViewControlWithWidth = styled(ViewControl)`
    width: 150px;
`;

export const WithHint: Story = {
    render: (args) => {
        const [value, setValue] = useState<string>('option1');
        return (
            <ViewControlWithWidth
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                hint="Select a view"
                onChange={setValue}
                value={value}
            />
        );
    },
};

export const WithIcons: Story = {
    args: {
        options: [
            { iconName: 'organization', label: 'Option 1', value: 'option1' },
            { iconName: 'calendar', label: 'Longer option 2', value: 'option2' },
            { iconName: 'history', label: 'Option 3', value: 'option3' },
            { iconName: 'files', label: 'Option 4', value: 'option4' },
        ] satisfies ViewControlOption[],
    },
    render: (args) => {
        const [value, setValue] = useState<string>('option1');
        return (
            <ViewControlWithWidth
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                onChange={setValue}
                value={value}
            />
        );
    },
};

const InvertedDecorator = styled.div`
    background-color: ${({ theme }) => theme.alias['color-background-indicator-active']};
    padding: 2rem;
`;

export const Inverted: Story = {
    render: (args) => {
        const [value, setValue] = useState<string>('option1');
        return (
            <ViewControl
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                onChange={setValue}
                value={value}
                variant="inverted"
            />
        );
    },
};

Inverted.decorators = [decorateWith(InvertedDecorator)];
