import React from 'react';

const legend = props => {
    return (
        <ul>
            {props.legend.map(lgd => (
                <li>
                    <p>{lgd.name}</p>
                    <span>{lgd.description}</span>
                </li>
            ))}
        </ul>
    )
}

export default legend;