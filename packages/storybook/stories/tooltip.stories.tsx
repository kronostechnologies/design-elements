import {
    IconButton,
    Tooltip,
} from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';

const Container = styled.div`
    height: 100px;
`;

export default {
    title: 'Components/Tooltip',
    component: Tooltip,
};

const DarkDiv = styled.div`
    align-items: center;
    background-color: ${({ theme }) => theme.main['primary-1.1']};
    display: flex;
    height: 50px;
    justify-content: center;
    width: 100%;
`;

export const Default: Story = () => (
    <Tooltip label="Tooltip Content" />
);

const CodeContainer = styled.div`
    display: flex;
`;
export const Confirmation: Story = () => {
    const code = 'JBSW Y3DP EHPK 3PXP';

    return (
        <Container>
            <CodeContainer>
                <span>{code}</span>
                <Tooltip
                    label="label"
                    confirmationLabel="label confirmation"
                    desktopPlacement="bottom"
                    mode='confirm'
                >
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
    );
};
