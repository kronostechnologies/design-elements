import styled from 'styled-components';

const Card = styled.div`
    background: ${(props) => props.theme.greys.white};
    border: 1px solid ${(props) => props.theme.greys['light-grey']};
    border-radius: var(--border-radius-2x);
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    margin-bottom: var(--spacing-3x);
    padding: var(--spacing-4x);
`;

export { Card };
