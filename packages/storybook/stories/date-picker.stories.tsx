import React from 'react';

import { Datepicker } from '@equisoft/design-elements-react';

export default {
    title: 'Datepicker',
    component: Datepicker,
};

export const normal = () => (
    <div
        style={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            height: '90vh',
            justifyContent: 'space-between',
            width: '100%',
        }}
    >
        <Datepicker position="bottomRight" value={new Date('2002-07-14')} />
        <Datepicker position="bottomLeft" disabled/>
        <Datepicker position="topRight" valid={false} validationErrorMessage="Format de date non valide" />
        <Datepicker position="topLeft" />
        <form>
            <Datepicker position="topLeft" required max="2016-02-02" min="2002-02-02" />
            <button type="submit">Submit</button>
        </form>
    </div>
);
