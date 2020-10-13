import { ApplicationMenu, MenuButton, Option } from '@equisoft/design-elements-react';
import React, { ComponentType } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

export default {
    title: 'Menu Button',
    component: MenuButton,
    decorators: [(Story: ComponentType) => (
        <BrowserRouter>
            <StyledDiv>
                <Story/>
            </StyledDiv>
        </BrowserRouter>
    )],
};

export const normal = () => (
    <ApplicationMenu>
        <MenuButton label="Menu Button" options={options}/>
    </ApplicationMenu>
);

export const withLinks = () => {
    const MenuOptions: Option[] = [
        {
            label: 'Option A',
            value: 'optionA',
            href: '/linkA',
        },
        {
            label: 'Option B',
            value: 'optionB',
            href: '/linkB',
        },
    ];

    return (
        <ApplicationMenu>
            <MenuButton label="Menu Button" options={MenuOptions}/>
        </ApplicationMenu>
    );
};

export const withCallbacks = () => {
    const MenuOptions: Option[] = [
        {
            label: 'Option A',
            value: 'optionA',
            onSelect: (option) => console.log('selected ', option?.label),
        },
        {
            label: 'Option B',
            value: 'optionB',
            onSelect: (option) => console.log('selected ', option?.label),
        },
    ];

    return (
        <ApplicationMenu>
            <MenuButton label="Menu Button" options={MenuOptions}/>
        </ApplicationMenu>
    );
};

export const defaultOpen = () => (
    <ApplicationMenu>
        <MenuButton defaultOpen label="Menu Button" options={options}/>
    </ApplicationMenu>
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
