import React from 'react';

import { Button, Popover } from '@equisoft/design-elements-react';

export default {
    title: 'Popover',
    component: Popover,
};

const target = <Button buttonType="primary">target</Button>;

export const popover = () => (
    <Popover target={target}>popover content</Popover>
);

export const popoverWithBottomPosition = () => (
    <Popover target={target} position="bottom">popover content</Popover>
);

export const popoverWithLeftPosition = () => (
    <Popover target={target} position="left">popover content</Popover>
);

export const popoverWithDistanceFromTarget = () => (
    <Popover target={target} distance={24}>popover content</Popover>
);

export const popoverWithoutArrow = () => (
    <Popover target={target} arrow={false}>popover content</Popover>
);

export const popoverWithFocusableItems = () => (
    <Popover target={target} position="right">
        <ul>
            <li>
                <button>item a</button>
            </li>
            <li>
                <button>item b</button>
            </li>
        </ul>
    </Popover>
);
