import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    position: absolute;
    z-index: -1;

    + label {
        align-items: center;
        background-color: #FFFFFF;
        border: 1px solid #D9DDE2;
        border-radius: 8px;
        color: #637282;
        display: flex;
        font-size: 24px;
        justify-content: center;
        min-height: 40px;
    }

    &:checked + label {
        background-color: #006296;
        border-color: #006296;
        color: #FFFFFF;
    }
`;

export default ({ checked, label, name, value }) => (
    <div>
        <Input checked={checked} id="id" name={name} type="radio" value={value} />
        <label htmlFor="id">{label}</label>
    </div>
);
