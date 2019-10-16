import React from 'react';

import { Datepicker } from '@equisoft/design-elements-react';

export default {
    title: 'Datepicker',
    component: Datepicker,
};

const storiesStyle = {
    display: 'flex',
    height: '290px',
    justifyContent: 'space-between',
};

export const normal = () => (
    <div
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            height: '400px',
            justifyContent: 'space-between',
            width: '100%',
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Datepicker/>
            <Datepicker position="bottomLeft"/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Datepicker position="topRight"/>
            <Datepicker position="topLeft"/>
        </div>
    </div>
);

export const disabled = () => (
    <Datepicker disabled/>
);
export const withValue = () => (
    <div style={storiesStyle}>
        <Datepicker value={new Date('2002-07-14')} />
    </div>
);
export const errorMessage = () => (
    <div style={storiesStyle}>
        <Datepicker valid={false} validationErrorMessage="Invalid date format" />
    </div>
);
export const withCallback = () => (
    <div style={storiesStyle}>
        <Datepicker
            onDateChanged={(date: Date, valid: boolean) => {
                console.log('Date: ' + date + ' Validity: ' + valid);
            }}
        />
    </div>
);
export const required = () => (
    <form style={{ display: 'flex' }}>
        <div style={storiesStyle}>
            <Datepicker required max="2016-02-02" min="2002-02-02" />
        </div>
        <div>
            <button type="submit">Submit</button>
        </div>
    </form>
);
