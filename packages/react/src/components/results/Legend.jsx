import React from 'react';

const legend = props => {
    const legend = [
        {
            name: "Barry",
            description: "white"
        },
        {
            name: "Samuel",
            description: "L.Chang"
        },
    ]

    return (
        <ul>
            {legend.map(lgd => (
                <li>
                    <p>{lgd.name}</p>
                    <span>{lgd.description}</span>
                </li>
            ))}
        </ul>
    )
}

export default legend;