import React, { ReactElement } from 'react';

import styled from 'styled-components';
import { Theme } from '../theme-wrapper/theme-wrapper';

const List = styled.ul`
  margin: 0;
  padding: 0 1.2rem;
`;

const Item = styled.li`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0 0 15px;

  p {
    font-size: 0.875rem;
    margin: 0;
  }

  ::before {
    color: ${(props: {theme: Theme, color?: string}) => props.color || props.theme.main['primary-1.1']};
    content: '•';
    font-size: 2.6em;
    font-weight: 600;
    margin: -0.4em 0 0 -0.5em;
    width: 0.5em;
  }
`;

const Description = styled.span`
  color: ${props => props.theme.greys['dark-grey']};
  font-size: 0.75rem;
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
