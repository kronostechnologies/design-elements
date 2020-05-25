import { mount, ReactWrapper } from 'enzyme';
import React, { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { IntlProvider } from './internationalization-provider';

describe('Internationalization Provider', () => {
    test('language should be en', () => {
        const wrapper = mountComponent(<TestButton/>);

        expect(wrapper.find('button').props().value).toBe('en');
    });

    test('language should be fr', () => {
        const wrapper = mountComponent(<TestButton/>, 'fr');

        expect(wrapper.find('button').props().value).toBe('fr');
    });
});

function TestButton(): ReactElement {
    const { i18n } = useTranslation();
    return <button value={i18n.language} />;
}

function mountComponent(children: ReactElement, language?: string): ReactWrapper {
    return mount(
        <IntlProvider language={language}>
            {children}
        </IntlProvider>,
    );
}
