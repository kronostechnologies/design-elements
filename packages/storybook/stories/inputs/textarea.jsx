import React from 'react';
import { storiesOf } from '@storybook/react';
import { TextArea } from '@equisoft/design-elements-react';

storiesOf('TextArea', module)
    .add('Normal', () => (
        <TextArea
            id="ta_normal"
            label="Text area label"
            placeholder="Enter your text here"
        />
    ))
    .add('Event callbacks (see console)', () => (
        <TextArea
            id="ta_callbacks"
            label="Text area label"
            onChange={(e) => console.log(`Custom function called on change. Current value: ${e.target.value}`)}
            onBlur={(e) => console.log(`Custom function called on blur. Current value: ${e.target.value}`)}
            onFocus={(e) => console.log(`Custom function called on focus. Current value: ${e.target.value}`)}
            placeholder="Enter your text here"
        />
    ))
    .add('Required', () => (
        <TextArea
            id="ta_required"
            label="Text area label"
            placeholder="Enter your text here"
            required
        />
    ))
    .add('Default Value', () => (
        <TextArea
            defaultValue="Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio."
            id="ta_filled"
            label="A label for a filled text area"
            placeholder="Enter your text here"
            required
        />
    ))
    .add('Disabled', () => (
        <TextArea
            disabled
            id="ta_disabled"
            label="A label for the disabled text area"
            placeholder="Sorry but this field is disabled"
            required
        />
    ));
