import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TextArea } from '@equisoft/design-elements-react';

storiesOf('TextArea', module)
    .add('Normal', () => (
        <TextArea
            id="ta_normal"
            label="Text area label"
            validMsg='Temporary Message'
        />
    ))
    .add('Event callbacks (see console)', () => (
        <TextArea
            id="ta_callbacks"
            label="Text area label"
            changeCallback={(value) => console.log(`Custom function called on change. Current value: ${value}`)}
            blurCallback={(value) => console.log(`Custom function called on blur. Current value: ${value}`)}
            focusCallback={(value) => console.log(`Custom function called on focus. Current value: ${value}`)}
            validMsg='Temporary Message'
        />
    ))
    .add('Required', () => (
        <TextArea
            id="ta_required"
            label="Text area label"
            validMsg='Temporary Message'
            required
        />
    ))
    .add('Default Value', () => (
        <TextArea
            defaultValue="Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio."
            id="ta_filled"
            label="A label for a filled text area"
            validMsg='Temporary Message'
            required
        />
    ))
    .add('Disabled', () => (
        <TextArea
            disabled
            id="ta_disabled"
            label="A label for the disabled text area"
            validMsg='Temporary Message'
            required
        />
    ));
