import React from 'react';
import styled from 'styled-components';

import Button from '../primary';
import SVG from '../../svg';
import plusSign from '../../../icons/plus-sign.svg';

const Icon = styled(SVG)`
    fill: #FFFFFF;
    height: 16px;
    margin-right: 8px;
    width: 16px;
`;

export default ({ children, disabled, onClick }) => (
    <Button disabled={disabled} onClick={onClick}>
        <Icon svg={plusSign} />
        {children}
    </Button>
);
