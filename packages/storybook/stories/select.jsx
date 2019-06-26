import React from 'react';
import { storiesOf } from '@storybook/react';
import { Select } from '@equisoft/design-elements-react';

storiesOf('Select', module)
    .add('Default', () => (
        <Select
            id="s_provinces"
            name="provinces"
            label="Choose your province or territory"
        >
            <option value="">-</option>
            <option value="on">Ontario</option>
            <option value="qc">Quebec</option>
            <option value="bc">British Columbia</option>
            <option value="ab">Alberta</option>
            <option value="mb">Manitoba</option>
            <option value="sk">Saskatchewan</option>
            <option value="ns">Nova Scotia</option>
            <option value="nb">New Brunswick</option>
            <option value="nl">Newfoundland and Labrador</option>
            <option value="pe">Prince Edward Island</option>
            <option value="nt">Northwest Territories</option>
            <option value="nu">Nunavut</option>
            <option value="yt">Yukon</option>
        </Select>
    ));
