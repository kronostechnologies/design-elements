import { SkipLink } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

const Navigation = styled.nav`
    align-items: center;
    background-color: ${({ theme }) => theme.ref['color-black']};
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    color: ${({ theme }) => theme.ref['color-white']};
    display: flex;
    height: 56px;
    justify-content: center;
    width: 100%;
`;

const Main = styled.main`
    align-items: center;
    background-color: ${({ theme }) => theme.ref['color-neutral-15']};
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    display: flex;
    height: 150px;
    justify-content: center;
    width: 100%;
`;

const SkipLinkMeta: Meta<typeof SkipLink> = {
    title: 'Components/Skip Link',
    component: SkipLink,
    argTypes: {
        onClick: {
            control: { type: null },
        },
    },
    render: (args) => (
        <>
            <SkipLink
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...args}
                href="#main"
            />
            <Navigation>
                <p tabIndex={0}>Navigation</p>
            </Navigation>
            <Main id="main">
                <p tabIndex={0}>Main content</p>
            </Main>
        </>
    ),
};

export default SkipLinkMeta;
type Story = StoryObj<typeof SkipLink>;

export const Default: Story = {
    ...SkipLinkMeta,
};
