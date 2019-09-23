import React from 'react';

import { TextArea } from '@equisoft/design-elements-react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

storiesOf('TextArea', module)
    .add('Normal', () => (
        <TextArea
            label={text('label', 'Text area label')}
            placeholder={text('placeholder', 'Enter your text here')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
            disabled={boolean('disabled', false)}
            required={boolean('required', false)}
            onChange={action('onChange callback')}
            onBlur={action('onBlur callback')}
            onFocus={action('onFocus callback')}
        />
    ))
    .add('Controlled value', () => (
        <TextArea
            label={text('label', 'Text area label')}
            placeholder={text('placeholder', 'Enter your text here')}
            value={text('value', 'This is the value')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
            disabled={boolean('disabled', false)}
            required={boolean('required', false)}
            onChange={action('onChange callback')}
            onBlur={action('onBlur callback')}
            onFocus={action('onFocus callback')}
        />
    ))
    .add('Required', () => (
        <TextArea
            label={text('label', 'Text area label')}
            placeholder={text('placeholder', 'Enter your text here')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
            disabled={boolean('disabled', false)}
            required={boolean('required', true)}
            onChange={action('onChange callback')}
            onBlur={action('onBlur callback')}
            onFocus={action('onFocus callback')}
        />
    ))
    .add('Default Value', () => (
        <TextArea
            label={text('label', 'Text area label')}
            placeholder={text('placeholder', 'Enter your text here')}
            defaultValue={'Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio.'}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
            disabled={boolean('disabled', false)}
            required={boolean('required', false)}
            onChange={action('onChange callback')}
            onBlur={action('onBlur callback')}
            onFocus={action('onFocus callback')}
        />
    ))
    .add('Disabled', () => (
        <TextArea
            label={text('label', 'A label for the disabled text area')}
            placeholder={text('placeholder', 'This field is disabled')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
            disabled={boolean('disabled', true)}
            required={boolean('required', false)}
            onChange={action('onChange callback')}
            onBlur={action('onBlur callback')}
            onFocus={action('onFocus callback')}
        />
    ));
