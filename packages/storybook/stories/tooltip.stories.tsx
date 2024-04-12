import { IconButton, Tooltip } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

const Container = styled.div`
    height: 100px;
`;

const meta: Meta<typeof Tooltip> = {
    title: 'Components/Tooltip',
    component: Tooltip,
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
    args: {
        label: 'Tooltip content',
    },
};

const CodeContainer = styled.div`
    display: flex;
`;

const code = 'JBSW Y3DP EHPK 3PXP';

export const Confirmation: Story = {
    args: {
        label: 'label',
        confirmationLabel: 'label confirmation',
        desktopPlacement: 'bottom',
        mode: 'confirm',
    },
    render: (args) => (
        <Container>
            <CodeContainer>
                <span>{code}</span>
                <Tooltip {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
                    <IconButton
                        buttonType='tertiary'
                        type='button'
                        iconName='copy'
                        onClick={() => {
                            navigator.clipboard.writeText(code);
                        }}
                    />
                </Tooltip>
            </CodeContainer>
        </Container>
    ),
};
