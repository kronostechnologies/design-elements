export const abstractStyle = `
    align-items: center;
    appearance: none;
    background: inherit;
    border: 1px solid;
    border-radius: 1.6rem;
    color: inherit;
    display: inline-flex;
    font-family: inherit;
    font-size: 0.75rem;
    font-weight: var(--font-bold);
    justify-content: center;
    letter-spacing: 0.55px;
    min-height: 2rem;
    min-width: 2rem;
    outline: none;
    padding: var(--spacing-half) var(--spacing-2x);
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    user-select: none;

    &:not(:disabled) {
        cursor: pointer;
    }

    > svg {
        color: inherit;
    }
`;
