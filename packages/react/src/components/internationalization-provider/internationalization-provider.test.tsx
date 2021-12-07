import { mount, ReactWrapper } from 'enzyme';
import { ReactElement } from 'react';
import { useTranslation } from '../../i18n/use-translation';
import { IntlProvider } from './internationalization-provider';

function TestButton(): ReactElement {
    const { i18n } = useTranslation();
    return <button type="button" value={i18n.language} />;
}

function mountComponentWithIntlProvider(language?: string): ReactWrapper {
    return mount(
        <IntlProvider language={language}>
            <TestButton />
        </IntlProvider>,
    );
}

describe('Internationalization Provider', () => {
    test('language should be en', () => {
        const wrapper = mountComponentWithIntlProvider();

        expect(wrapper.find('button').props().value).toBe('en');
    });

    test('language should be fr', () => {
        const wrapper = mountComponentWithIntlProvider('fr');

        expect(wrapper.find('button').props().value).toBe('fr');
    });
});
