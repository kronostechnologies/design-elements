import React from 'react';

import { TextArea } from '@equisoft/design-elements-react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

export default { title: 'TextArea' };

export const normal = () => (
    <TextArea
        label={text('label', 'Text area label')}
        placeholder={text('placeholder', 'Enter your text here')}
        validationErrorMessage={text('validationErrorMessage', 'Error message')}
        disabled={boolean('disabled', false)}
        required={boolean('required', false)}
    />
);
export const controlledValue = () => (
    <TextArea
        label={text('label', 'Text area label')}
        placeholder={text('placeholder', 'Enter your text here')}
        value={text('value', 'This is the value')}
        validationErrorMessage={text('validationErrorMessage', 'Error message')}
        disabled={boolean('disabled', false)}
        required={boolean('required', false)}
    />
);
export const eventCallbacks = () => (
    <TextArea
        label={text('label', 'Text area label')}
        onChange={event => {
            console.log(`Custom function called on change. Current value: ${event.currentTarget.value}`);
        }}
        onBlur={event => {
            console.log(`Custom function called on blur. Current value: ${event.currentTarget.value}`);
        }}
        onFocus={event => {
            console.log(`Custom function called on focus. Current value: ${event.currentTarget.value}`);
        }}
        placeholder={text('placeholder', 'Enter your text here')}
        validationErrorMessage={text('validationErrorMessage', 'Error message')}
        disabled={boolean('disabled', false)}
        required={boolean('required', false)}
    />
);
export const required = () => (
    <TextArea
        label={text('label', 'Text area label')}
        placeholder={text('placeholder', 'Enter your text here')}
        validationErrorMessage={text('validationErrorMessage', 'Error message')}
        disabled={boolean('disabled', false)}
        required={boolean('required', true)}
    />
);
export const defaultValue = () => (
    <TextArea
        label={text('label', 'Text area label')}
        placeholder={text('placeholder', 'Enter your text here')}
        defaultValue={'Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio.'}
        validationErrorMessage={text('validationErrorMessage', 'Error message')}
        disabled={boolean('disabled', false)}
        required={boolean('required', false)}
    />
);
export const disabled = () => (
    <TextArea
        label={text('label', 'A label for the disabled text area')}
        placeholder={text('placeholder', 'This field is disabled')}
        validationErrorMessage={text('validationErrorMessage', 'Error message')}
        disabled={boolean('disabled', true)}
        required={boolean('required', false)}
    />
);
