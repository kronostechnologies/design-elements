import React from 'react';
import { storiesOf } from '@storybook/react';
import { Checkbox, OptionButton, SearchInput, Select, TextInput } from '@equisoft/design-elements-react';

storiesOf('Inputs', module)
    .add('Checkbox', () => (
        <Checkbox>Option Button</Checkbox>
    ))
    .add('Option Button', () => (
        <OptionButton label="0-24" />
    ))
    .add('Search', () => (
        <SearchInput>Primary Button</SearchInput>
    ))
    .add('Select', () => (
        <Select><option>Select Input</option></Select>
    ))
    .add('Text', () => (
        <TextInput>Secondary Button</TextInput>
    ));
