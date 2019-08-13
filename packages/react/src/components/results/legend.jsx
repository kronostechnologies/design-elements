import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
    margin: 0;
    padding: 0 1.2rem;
`;

const Item = styled.li`
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0 0 15px;

    p {
        margin: 0;
        font-size: 0.875rem;
    }

    ::before {
        content: '•';
        font-size: 2.6em;
        color: ${props => props.color || 'rgb(101, 226, 255)'};
        font-weight: bold;
        width: 0.5em;
        margin: -0.4em 0 0 -0.5em;
    }
`;

const Description = styled.span`
    font-size: 0.75rem;
    color: rgb(87, 102, 110);
`;

const legend = ({ items }) => (
    <List>
        {items.map(item => (
            <Item color={item.color}>
                <div>
                    <p>{item.name}</p>
                    <Description>{item.description}</Description>
                </div>
            </Item>
        ))}
    </List>
);

export default legend;
