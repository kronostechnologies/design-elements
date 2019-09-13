import React from 'react';

import { TextArea } from '@equisoft/design-elements-react';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

storiesOf('TextArea', module)
    .add('Normal', () => (
        <TextArea
            label={text('label', 'Text area label')}
            placeholder={text('placeholder', 'Enter your text here')}
            defaultValue={text('defaultValue', '')}
            value={text('value', '')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
            disabled={boolean('disabled', false)}
            required={boolean('required', false)}
        />
    ))
    .add('Event callbacks (see console)', () => (
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
            defaultValue={text('defaultValue', '')}
            value={text('value', '')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
            disabled={boolean('disabled', false)}
            required={boolean('required', false)}
        />
    ))
    .add('Required', () => (
        <TextArea
            label={text('label', 'Text area label')}
            placeholder={text('placeholder', 'Enter your text here')}
            defaultValue={text('defaultValue', '')}
            value={text('value', '')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
            disabled={boolean('disabled', false)}
            required={boolean('required', true)}
        />
    ))
    .add('Default Value', () => (
        <TextArea
            label={text('label', 'Text area label')}
            placeholder={text('placeholder', 'Enter your text here')}
            defaultValue={text('defaultValue', 'Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio.')}
            value={text('value', 'Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio.')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
            disabled={boolean('disabled', false)}
            required={boolean('required', false)}
        />
    ))
    .add('Disabled', () => (
        <TextArea
            label={text('label', 'A label for the disabled text area')}
            placeholder={text('placeholder', 'This field is disabled')}
            defaultValue={text('defaultValue', '')}
            value={text('value', '')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
            disabled={boolean('disabled', true)}
            required={boolean('required', false)}
        />
    ));
