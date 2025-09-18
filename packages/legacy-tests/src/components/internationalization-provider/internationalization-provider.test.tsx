import { mount, ReactWrapper } from 'enzyme';
import { type FC } from 'react';
import { useTranslation } from '~/components/../i18n/use-translation';
import { IntlProvider } from '~/components/internationalization-provider/internationalization-provider';

const TestButton: FC = () => {
    const { i18n } = useTranslation();
    return <button type="button" value={i18n.language} />;
};

function mountComponentWithIntlProvider(language?: string): ReactWrapper {
    return mount(
        <IntlProvider language={language}>
            <TestButton />
        </IntlProvider>,
    );
}

describe('Internationalization Provider', () => {
    it('language should be en', () => {
        const wrapper = mountComponentWithIntlProvider();

        expect(wrapper.find('button').props().value).toBe('en');
    });

    it('language should be fr', () => {
        const wrapper = mountComponentWithIntlProvider('fr');

        expect(wrapper.find('button').props().value).toBe('fr');
    });

    it('language should switch', async () => {
        const wrapper = mountComponentWithIntlProvider('fr');

        wrapper.setProps({ language: 'en' }).update();

        expect(wrapper.find('button').props().value).toBe('en');
    });
});
