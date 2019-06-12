import React from 'react';
import { storiesOf } from '@storybook/react';
import { Textarea } from '@equisoft/design-elements-react';

storiesOf('Textarea', module)
    .add('Normal', () => (
        <Textarea
            id="ta_normal"
            label="Text area label"
            placeholder="Enter your text here"
        />
    ))
    .add('Optional', () => (
        <Textarea
            optional="Optional"
            id="ta_optional"
            label="Text area label"
            placeholder="Enter your text here"
        />
    ))
    .add('Filled', () => (
        <Textarea
            defaultValue="Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio."
            id="ta_filled"
            label="A label for a filled text area"
            placeholder="Enter your text here"
        />
    ))
    .add('Disabled', () => (
        <Textarea
            disabled
            id="ta_disabled"
            label="A label for the disabled text area"
            placeholder="Sorry but this field is disabled"
        />
    ))
    .add('Error', () => (
        <Textarea
            id="ta_error"
            label="A label for an invalid text area"
            valid={false}
            validMsg="This is a custom invalid message"
        />
    ));
