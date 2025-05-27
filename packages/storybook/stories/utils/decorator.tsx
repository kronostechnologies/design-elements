import { Button, DesignSystem } from '@equisoft/design-elements-react';
import { ComponentType, ElementType, ReactElement, useState } from 'react';

export type Decorator = (Story: ComponentType) => ReactElement;

export function decorateWith(Component: ElementType): Decorator {
    // eslint-disable-next-line react/function-component-definition
    return (Story: ComponentType) => (
        <Component>
            <Story />
        </Component>
    );
}

export const LanguageSwitchDecorator: Decorator = (Story: ComponentType) => {
    const [lang, setLang] = useState('fr');
    const otherLang = lang === 'fr' ? 'en' : 'fr';

    function handleClick(): void {
        setLang(otherLang);
    }

    return (
        <DesignSystem language={lang}>
            <Button buttonType="primary" onClick={handleClick}>{`Toggle from ${lang} to ${otherLang}`}</Button>
            <Story />
        </DesignSystem>
    );
};
