import { ApplicationMenu, NavMenuButton } from '@equisoft/design-elements-react';
import React from 'react';
import styled from 'styled-components';
import { RouterDecorator } from './utils/router-decorator';

export default {
    title: 'Nav Menu Button',
    component: NavMenuButton,
    decorators: [RouterDecorator],
};

export const normal = () => (
    <StyledDiv>
        <ApplicationMenu>
            <NavMenuButton label="Menu" options={options}/>
        </ApplicationMenu>
    </StyledDiv>
);

export const defaultOpen = () => (
    <StyledDiv>
        <ApplicationMenu>
            <NavMenuButton defaultOpen label="Menu" options={options}/>
        </ApplicationMenu>
    </StyledDiv>
);

const options = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testa',
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testb',
    },
    {
        label: 'Option C',
        value: 'optionC',
        href: '/testc',
    },
    {
        label: 'Option D',
        value: 'optionD',
        href: '/testd',
    },
];

const StyledDiv = styled.div`
    height: 180px;
`;
