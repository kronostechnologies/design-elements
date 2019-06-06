import React from 'react';
import { storiesOf } from '@storybook/react';
import { Textarea } from '@equisoft/design-elements-react';

storiesOf('Textarea', module)
    .add('Normal', () => (
        <Textarea id="ta_normal" placeholder="Enter your text here"></Textarea>
    ))
    .add('Filled', () => (
        <Textarea
            id="ta_filled"
            placeholder="Enter your text here"
            defaultValue="Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio."
        />
    ))
    .add('Disabled', () => (
        <Textarea disabled="disabled" id="ta_disabled" placeholder="This field is disabled" />
    ))
    .add('Error', () => (
        <Textarea id="ta_error" placeholder="Enter your text here" required />
    ));
