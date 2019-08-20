import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TextArea } from '@equisoft/design-elements-react';
import { action } from '@storybook/addon-actions';

storiesOf('TextArea', module)
    .add('Normal', () => (
        <TextArea
            id="ta_normal"
            label="Text area label"
        />
    ))
    .add('Event callbacks (see console)', () => (
        <TextArea
            id="ta_callbacks"
            label="Text area label"
            changeCallback={action('Custom function called on blur. Current value:')}
            blurCallback={action('Custom function called on blur. Current value:')}
            focusCallback={action('Custom function called on blur. Current value:')}
            validMsg='Temporary Message'
        />
    ))
    .add('Required', () => (
        <TextArea
            id="ta_required"
            label="Text area label"
            validMsg="This field is required"
            required
        />
    ))
    .add('Default Value', () => (
        <TextArea
            defaultValue="Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio."
            id="ta_filled"
            label="A label for a filled text area"
            validMsg="This field is required"
            required
        />
    ))
    .add('Disabled', () => (
        <TextArea
            disabled
            id="ta_disabled"
            label="A label for the disabled text area"
            validMsg="This field is required"
            required
        />
    ));
