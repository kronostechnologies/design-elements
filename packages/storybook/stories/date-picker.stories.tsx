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
    <Datepicker/>
);

export const disabled = () => (
    <Datepicker disabled/>
);
export const customDateFormat = () => (
    <Datepicker dateFormat="dd/MM"/>
);
export const customPlaceholder = () => (
    <Datepicker placeholder="Hello World"/>
);
export const invalid = () => (
    <Datepicker valid={false}/>
);
export const maxDate = () => (
    <Datepicker maxDate={upcomingDate}/>
);
export const minDate = () => (
    <Datepicker minDate={currentDate}/>
);
export const readOnly = () => (
    <Datepicker value="2002-02-02" readOnly/>
);
export const required = () => (
    <form onSubmit={(event: FormEvent) => event.preventDefault()}>
        <Datepicker required/>
        <button type="submit">Submit</button>
    </form>
);
export const startOpen = () => (
    <Datepicker startOpen/>
);
export const startDate = () => (
    <Datepicker startDate={new Date('1995-05-05')}/>
);
export const customLocale = () => (
    <Datepicker locale="fr-CA"/>
);
export const withOnChangeCallback = () => (
    <Datepicker onChange={(date: any) => console.log(`[onChange] Date: ${date}`)}/>
);
export const withOnBlurCallback = () => (
    <Datepicker onBlur={(event: any) => console.log(`[onBlur] Value: ${event.target.value}`)}/>
);
export const withOnFocusCallback = () => (
    <Datepicker onFocus={(event: any) => console.log(`[onFocus] Value: ${event.target.value}`)}/>
);
