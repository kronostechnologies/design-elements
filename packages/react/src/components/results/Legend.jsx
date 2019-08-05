import React from 'react';
import styled from 'styled-components';



const Item = styled.li`
    list-style: none;
    display: flex;

    ::before {
        content: '•';
        font-size: 2.5em;
        color: ${props => props.color|| "red"};
        font-weight: bold;
        display: inline; 
        width: 0.5em;
        margin-left: -0.5em;
        margin-top: -0.4em;
    }
`;

const legend = props => {

    const legend = [
        {
            name: "Barry",
            description: "white"
        },
        {
            name: "Samuel",
            description: "L.Chang",
            color: '#E87BDB'
        },
    ]

    return (
        <ul>
            {legend.map(lgd => (
                <Item color={lgd.color}>
                    <div>
                        {lgd.name}<br />
                        <span>{lgd.description}</span>
                    </div>
                </Item>
            ))}
        </ul>
    )
}

export default legend;