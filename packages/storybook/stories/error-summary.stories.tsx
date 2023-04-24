import { ErrorSummary, ErrorMessage, TextInput } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

export default {
    title: 'Notification/Error Summary',
    component: ErrorSummary,
};

const errorMessages: ErrorMessage[] = [
    { text: 'Please provide your first name.', targetId: 'es-first-name' },
    { text: 'Enter a valid postal code.', targetId: 'es-postal-code' },
];

const StyledFormContainer = styled.div`
    margin-top: var(--spacing-2x);
`;

export const Normal: Story = () => (
    <>
        <ErrorSummary messages={errorMessages} />

        <StyledFormContainer>
            <TextInput id="es-first-name" label="First name" />
            <TextInput id="es-postal-code" label="Postal code" value="G1H" />
        </StyledFormContainer>
    </>
);
