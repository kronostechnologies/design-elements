import * as React from 'react';

import { TextArea } from '@equisoft/design-elements-react';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('TextArea', module);

stories.add('Normal', () => (
        <TextArea
            label={text('label', 'Text area label')}
            validMsg={text('validMsg', 'Temporary Message')}
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
        />
    ))
    .add('Required', () => (
        <TextArea
            label={text('label', 'Text area label')}
            validMsg={text('validMsg', 'Temporary Message')}
            placeholder={text('placeholder', 'Enter your text here')}
            required={boolean('required', true)}
        />
    ))
    .add('Default Value', () => (
        <TextArea
            defaultValue={text('defaultValue', 'Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio.')}
            label={text('label', 'A label for a filled text area')}
            validMsg={text('validMsg', 'Temporary Message')}
            placeholder={text('placeholder', 'Enter your text here')}
            required={boolean('required', true)}
        />
    ))
    .add('Disabled', () => (
        <TextArea
            disabled={boolean('disabled', true)}
            label={text('label', 'A label for the disabled text area')}
            validMsg={text('validMsg', 'Temporary Message')}
            placeholder={text('placeholder', 'Enter your text here')}
            required={boolean('required', true)}
        />
    ));
