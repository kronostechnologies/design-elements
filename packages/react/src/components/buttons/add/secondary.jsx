import React from 'react';
import styled from 'styled-components';

import Button from '../secondary';
import SVG from '../../svg';
import plusSign from '../../../icons/plus-sign.svg';

const Icon = styled(SVG)`
    fill: #E2732D;
    height: 16px;
    margin-right: 8px;
    width: 16px;
`;

export default ({ children, onClick }) => (
    <Button onClick={onClick}>
        <Icon svg={plusSign} />
        {children}
    </Button>
);
