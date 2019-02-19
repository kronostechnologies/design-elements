import React from 'react';

export default ({ className, svg }) => (
    <svg className={className}>
        <use href={`#${svg.id}`} />
    </svg>
);
