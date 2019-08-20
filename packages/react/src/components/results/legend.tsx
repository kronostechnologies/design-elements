import React from 'react';
import styled from 'styled-components';

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
    color: ${props => props.color || 'rgb(101, 226, 255)'};
    content: '•';
    font-size: 2.6em;
    font-weight: 600;
    margin: -0.4em 0 0 -0.5em;
    width: 0.5em;
  }
`;

const Description = styled.span`
  color: rgb(87, 102, 110);
  font-size: 0.75rem;
`;

interface LegendProps {
    items: {name: string, description: string, color?: string}[];
}

const Legend = ({ items }: LegendProps) => (
    <List>
        {items.map((item) => (
            <Item color={item.color}>
                <div>
                    <p>{item.name}</p>
                    <Description>{item.description}</Description>
                </div>
            </Item>
        ))}
    </List>
);

export { Legend };
