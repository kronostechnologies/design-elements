import React, { FormEvent, ReactElement } from 'react';
import styled from 'styled-components';

import { Datepicker } from '@equisoft/design-elements-react';
import { es } from 'date-fns/locale';

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
    <Datepicker label="date"/>
);

export const disabled = () => (
    <Datepicker label="date" disabled/>
);
export const invalid = () => (
    <Datepicker label="date" valid={false}/>
);
export const maxDate = () => (
    <Datepicker label="date" maxDate={upcomingDate}/>
);
export const minDate = () => (
    <Datepicker label="date" minDate={currentDate}/>
);
export const readOnly = () => (
    <Datepicker label="date" value="2002-02-02" readOnly/>
);
export const required = () => (
    <form onSubmit={(event: FormEvent) => event.preventDefault()}>
        <Datepicker label="date" required/>
        <button type="submit">Submit</button>
    </form>
);
export const startOpen = () => (
    <Datepicker label="date" startOpen/>
);
export const startDate = () => (
    <Datepicker label="date" startDate={new Date('1995-05-05')}/>
);
export const customLocale = () => (
    <Datepicker label="date" locale={es}/>
);
export const withOnChangeCallback = () => (
    <Datepicker label="date" onChange={(date: any) => console.log(`[onChange] Date: ${date}`)}/>
);
export const withOnBlurCallback = () => (
    <Datepicker label="date" onBlur={(event: any) => console.log(`[onBlur] Value: ${event.target.value}`)}/>
);
export const withOnFocusCallback = () => (
    <Datepicker label="date" onFocus={(event: any) => console.log(`[onFocus] Value: ${event.target.value}`)}/>
);
