import React from 'react';

import { PhoneInput } from '@equisoft/design-elements-react';
import { DesktopDecorator } from "./utils/device-context-decorator";

export default {
    title: 'Phone Input',
    component: PhoneInput,
};

export const normal = () => (
    <PhoneInput pattern="(XXX) XXX-XXXX" value="" />
);
normal.decorators = [DesktopDecorator];
/*
export const filledPhoneInput = () => (
    <PhoneInput hint="Hint" label="Label" defaultValue="555-555-5555" />
);
filledPhoneInput.decorators = [DesktopDecorator];

export const disabledPhoneInput = () => (
    <PhoneInput hint="Hint" label="Label" disabled />
);
disabledPhoneInput.decorators = [DesktopDecorator];

export const requiredPhoneInput = () => (
    <PhoneInput hint="Hint" label="Label" validationErrorMessage="This field is required" required />
);
requiredPhoneInput.decorators = [DesktopDecorator];

export const eventCallbacks = () => (
    <PhoneInput
        hint="Hint"
        label="Label"
        onChange={event => {
            console.log(`Custom function called on change. Current value: ${event.currentTarget.value}`);
        }}
        onBlur={event => {
            console.log(`Custom function called on blur. Current value: ${event.currentTarget.value}`);
        }}
        onFocus={event => {
            console.log(`Custom function called on focus. Current value: ${event.currentTarget.value}`);
        }}
    />
);
eventCallbacks.decorators = [DesktopDecorator];

export const mobile = () => (
    <PhoneInput hint="Hint" label="Label" />
);
mobile.decorators = [MobileDecorator];*/
