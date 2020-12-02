import styled from 'styled-components';

const Card = styled.div`
    --border-radius: 8px;

    background: ${(props) => props.theme.greys.white};
    border: 1px solid ${(props) => props.theme.greys['light-grey']};
    border-radius: var(--border-radius);
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin-bottom: var(--spacing-3x);
    padding: var(--spacing-4x);
`;

export { Card };
