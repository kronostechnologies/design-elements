import { TextArea } from '@equisoft/design-elements-react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

storiesOf('TextArea', module)
    .add('Normal', () => (
        <TextArea
            label="Text area label"
            placeholder="Enter your text here"
        />
    ))
    .add('Event callbacks (see console)', () => (
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
        />
    ))
    .add('Required', () => (
        <TextArea
            label="Text area label"
            validMsg="This field is required"
            placeholder="Enter your text here"
            required
        />
    ))
    .add('Default Value', () => (
        <TextArea
            defaultValue="Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio."
            label="A label for a filled text area"
            validMsg="This field is required"
            placeholder="Enter your text here"
            required
        />
    ))
    .add('Disabled', () => (
        <TextArea
            disabled
            label="A label for the disabled text area"
            validMsg="This field is required"
            placeholder="Sorry but this field is disabled"
            required
        />
    ));
