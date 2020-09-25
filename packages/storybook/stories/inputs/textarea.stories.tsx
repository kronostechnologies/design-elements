import { TextArea } from '@equisoft/design-elements-react';
import React from 'react';

export default {
    title: 'TextArea',
    component: TextArea,
};

export const normal = () => (
    <TextArea
        label="Text area label"
        disabled={false}
        required={false}
    />
);
export const controlledValue = () => (
    <TextArea
        label="Text area label"
        value="This is the value"
        disabled={false}
        required={false}
    />
);
export const eventCallbacks = () => (
    <TextArea
        label="Text area label"
        onChange={event => {
            console.log(`Custom function called on change. Current value: ${event.currentTarget.value}`);
        }}
        onBlur={event => {
            console.log(`Custom function called on blur. Current value: ${event.currentTarget.value}`);
        }}
        onFocus={event => {
            console.log(`Custom function called on focus. Current value: ${event.currentTarget.value}`);
        }}
        disabled={false}
        required={false}
    />
);
export const required = () => (
    <TextArea
        label="Text area label"
        disabled={false}
        required={true}
    />
);
export const defaultValue = () => (
    <TextArea
        label="Text area label"
        defaultValue={'Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio.'}
        disabled={false}
        required={false}
    />
);
export const disabled = () => (
    <TextArea
        label="A label for the disabled text area"
        disabled={true}
        required={false}
    />
);
