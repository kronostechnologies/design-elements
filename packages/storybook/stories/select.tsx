import * as React from 'react';

import { Select } from '@equisoft/design-elements-react';
import { boolean, object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

const provinces = [{value: '', label: '-'},
                   {value: 'on', label: 'Ontario'},
                   {value: 'qc', label: 'Quebec'},
                   {value: 'bc', label: 'British Columbia'},
                   {value: 'ab', label: 'Alberta'},
                   {value: 'mb', label: 'Manitoba'},
                   {value: 'sk', label: 'Saskatchewan'},
                   {value: 'ns', label: 'Nova Scotia'},
                   {value: 'nb', label: 'New Brunswick'},
                   {value: 'nl', label: 'Newfoundland and Labrador'},
                   {value: 'pe', label: 'Prince Edward Island'},
                   {value: 'nt', label: 'Northwest Territories'},
                   {value: 'nu', label: 'Nunavut'},
                   {value: 'yt', label: 'Yukon'}];

const stories = storiesOf('Select', module);
stories.addDecorator(withKnobs);

stories.add('Default', () => (
        <Select
            id={text('id', 's_provinces')}
            label={text('label', 'Choose your province or territory')}
            options={object('options', provinces)} 
            valid={boolean('valid', true)}
            validMsg={text('validMsg', 'Temporary Message')}
            children={boolean('children', true)}/>
    ));
