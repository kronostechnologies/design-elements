import { ErrorMessage, ErrorSummary, TextInput } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { createRef } from 'react';
import styled from 'styled-components';

const postalCodeInput = createRef<HTMLInputElement>();

const errorMessages: ErrorMessage[] = [
    { text: 'Please provide your first name.', target: 'es-first-name' },
    { text: 'Enter a valid postal code.', target: postalCodeInput },
];

const StyledFormContainer = styled.div`
    margin-top: var(--spacing-2x);
`;

const ErrorSummaryMeta: Meta<typeof ErrorSummary> = {
    title: 'Components/Error Summary',
    component: ErrorSummary,
    argTypes: {
        messages: {
            control: { disable: true },
        },
    },
    render: (args) => (
        <>
            <ErrorSummary
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...args}
                messages={errorMessages}
            />

            <StyledFormContainer>
                <TextInput id="es-first-name" label="First name" />
                <TextInput id="es-postal-code" label="Postal code" value="G1H" ref={postalCodeInput} />
            </StyledFormContainer>
        </>
    ),
};

export default ErrorSummaryMeta;
type Story = StoryObj<typeof ErrorSummary>;

export const Default: Story = {
    ...ErrorSummaryMeta,
};
