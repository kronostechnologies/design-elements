import React, { FormEvent, ReactElement } from 'react';
import styled from 'styled-components';

import { Datepicker } from '@equisoft/design-elements-react';

const Container = styled.div`
    height: 400px;
`;

const currentDate = new Date();
const upcomingDate = new Date();
upcomingDate.setDate(upcomingDate.getDate() + 5);

export default {
    title: 'Datepicker',
    component: Datepicker,
    decorators: [(storyFn: () => ReactElement) => <Container>{storyFn()}</Container>],
};

export const normal = () => (
    <Datepicker label="Date"/>
);

export const disabled = () => (
    <Datepicker label="Date" disabled/>
);
export const customDateFormat = () => (
    <Datepicker label="Date" dateFormat="dd/MM"/>
);
export const customPlaceholder = () => (
    <Datepicker label="Date" placeholder="Hello World"/>
);
export const invalid = () => (
    <Datepicker label="Date" valid={false}/>
);
export const maxDate = () => (
    <Datepicker label="Date" maxDate={upcomingDate}/>
);
export const minDate = () => (
    <Datepicker label="Date" minDate={currentDate}/>
);
export const readOnly = () => (
    <Datepicker label="Date" value="2002-02-02" readOnly/>
);
export const required = () => (
    <form onSubmit={(event: FormEvent) => event.preventDefault()}>
        <Datepicker label="Date" required/>
        <button type="submit">Submit</button>
    </form>
);
export const startOpen = () => (
    <Datepicker label="Date" startOpen/>
);
export const startDate = () => (
    <Datepicker label="Date" startDate={new Date('1995-05-05')}/>
);
export const customLocale = () => (
    <Datepicker label="Date" locale="fr-CA"/>
);
export const withOnChangeCallback = () => (
    <Datepicker label="Date" onChange={(date) => console.log(`[onChange] Date: ${date}`)}/>
);
export const withOnBlurCallback = () => (
    <Datepicker label="Date" onBlur={(event) => console.log(`[onBlur] Value: ${event.target.value}`)}/>
);
export const withOnFocusCallback = () => (
    <Datepicker label="Date" onFocus={(event) => console.log(`[onFocus] Value: ${event.target.value}`)}/>
);
