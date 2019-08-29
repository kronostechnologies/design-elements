import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TextArea } from '@equisoft/design-elements-react';

storiesOf('TextArea', module)
    .add('Normal', () => (
        <TextArea
            label="Text area label"
        />
    ))
    .add('Event callbacks (see console)', () => (
        <TextArea
            label="Text area label"
            changeCallback={(value) => console.log(`Custom function called on change. Current value: ${value}`)}
            blurCallback={(value) => console.log(`Custom function called on blur. Current value: ${value}`)}
            focusCallback={(value) => console.log(`Custom function called on focus. Current value: ${value}`)}
        />
    ))
    .add('Required', () => (
        <TextArea
            label="Text area label"
            validMsg="This field is required"
            required
        />
    ))
    .add('Default Value', () => (
        <TextArea
            defaultValue="Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio."
            label="A label for a filled text area"
            validMsg="This field is required"
            required
        />
    ))
    .add('Disabled', () => (
        <TextArea
            disabled
            label="A label for the disabled text area"
            validMsg="This field is required"
            required
        />
    ));
