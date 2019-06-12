import React from 'react';
import InputText from './text';

export default ({ type, ...props }) => (
    <InputText type="tel" {...props} />
);
