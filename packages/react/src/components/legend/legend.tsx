import React, { ReactElement } from 'react';

import styled from 'styled-components';
import { Theme } from '../theme-wrapper/theme-wrapper';

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  list-style: none;
  margin: 0 0 var(--spacing-1x);
  padding: 0 var(--spacing-2x);

  p {
    font-size: 0.875rem;
    line-height: 1.5rem;
    margin: 0;
  }

  ::before {
    background-color: ${(props: {theme: Theme, color?: string}) => props.color || props.theme.main['primary-1.2']};
    border-radius: 50%;
    content: '';
    height: 8px;
    margin: var(--spacing-1x) var(--spacing-1x) 0 calc(-1 * var(--spacing-2x));
    width: 8px;
  }
`;

const Description = styled.span`
  color: ${props => props.theme.greys['dark-grey']};
  display: block;
  font-size: 0.75rem;
  line-height: 1.25rem;
`;

interface LegendProps {
    items: { name: string; description: string; color?: string }[];
}

export function Legend({ items }: LegendProps): ReactElement {
    return (
        <List>
            {items.map((item, i) => (
                <Item color={item.color} key={`${item.name}-${i}`}>
                    <div>
                        <p>{item.name}</p>
                        <Description>{item.description}</Description>
                    </div>
                </Item>
            ))}
        </List>
    );
}
