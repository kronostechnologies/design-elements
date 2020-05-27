import React from 'react';
import { TextArea } from './text-area';

export default {
    title: 'TextArea',
    component: TextArea,
};

export const normal = () => (
    <TextArea
        label="Text area label"
        placeholder="Enter your text here"
        validationErrorMessage="Error message"
        disabled={false}
        required={false}
    />
);
export const controlledValue = () => (
    <TextArea
        label="Text area label"
        placeholder="Enter your text here"
        value="This is the value"
        validationErrorMessage="Error message"
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
        placeholder="Enter your text here"
        validationErrorMessage="Error message"
        disabled={false}
        required={false}
    />
);
export const required = () => (
    <TextArea
        label="Text area label"
        placeholder="Enter your text here"
        validationErrorMessage="Error message"
        disabled={false}
        required={true}
    />
);
export const defaultValue = () => (
    <TextArea
        label="Text area label"
        placeholder="Enter your text here"
        defaultValue={'Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio.'}
        validationErrorMessage="Error message"
        disabled={false}
        required={false}
    />
);
export const disabled = () => (
    <TextArea
        label="A label for the disabled text area"
        placeholder="This field is disabled"
        validationErrorMessage="Error message"
        disabled={true}
        required={false}
    />
);
