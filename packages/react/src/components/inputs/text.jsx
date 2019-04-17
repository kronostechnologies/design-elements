import React from 'react';

export default ({ label }) => (
    <div>
        <label htmlFor="id">{label}</label>
        <input id="id" type="text" />
    </div>
);
