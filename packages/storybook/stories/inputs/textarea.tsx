import * as React from 'react';

import { TextArea } from '@equisoft/design-elements-react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('TextArea', module);
stories.addDecorator(withKnobs);

stories.add('Normal', () => (
        <TextArea
            id={text('id', 'ta_normal')}
            label={text('label', 'Text area label')}
            validMsg={text('validMsg', 'Temporary Message')}
        />
    ))
    .add('Event callbacks (see console)', () => (
        <TextArea
            id={text('id', 'ta_callbacks')}
            label={text('label', 'Text area label')}
            onChange={(value) => console.log(`Custom function called on change. Current value: ${value}`)}
            onBlur={(value) => console.log(`Custom function called on blur. Current value: ${value}`)}
            onFocus={(value) => console.log(`Custom function called on focus. Current value: ${value}`)}
            validMsg={text('validMsg', 'Temporary Message')}
        />
    ))
    .add('Required', () => (
        <TextArea
            id={text('id', 'ta_required')}
            label={text('label', 'Text area label')}
            validMsg={text('validMsg', 'Temporary Message')}
            required={boolean('required', true)}
        />
    ))
    .add('Default Value', () => (
        <TextArea
            defaultValue={text('defaultValue', 'Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio.')}
            id={text('id', 'ta_filled')}
            label={text('label', 'A label for a filled text area')}
            validMsg={text('validMsg', 'Temporary Message')}
            required={boolean('required', true)}
        />
    ))
    .add('Disabled', () => (
        <TextArea
            disabled={boolean('disabled', true)}
            id={text('id', 'ta_disabled')}
            label={text('label', 'A label for the disabled text area')}
            validMsg={text('validMsg', 'Temporary Message')}
            required={boolean('required', true)}
        />
    ));
