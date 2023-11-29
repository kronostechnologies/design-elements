import { ErrorMessage, ErrorSummary, TextInput } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { createRef } from 'react';
import styled from 'styled-components';

export default {
    title: 'Components/Notification/Error Summary',
    component: ErrorSummary,
};

const postalCodeInput = createRef<HTMLInputElement>();

const errorMessages: ErrorMessage[] = [
    { text: 'Please provide your first name.', target: 'es-first-name' },
    { text: 'Enter a valid postal code.', target: postalCodeInput },
];

const StyledFormContainer = styled.div`
    margin-top: var(--spacing-2x);
`;

export const Normal: Story = () => (
    <>
        <ErrorSummary messages={errorMessages} />

        <StyledFormContainer>
            <TextInput id="es-first-name" label="First name" />
            <TextInput id="es-postal-code" label="Postal code" value="G1H" ref={postalCodeInput} />
        </StyledFormContainer>
    </>
);
