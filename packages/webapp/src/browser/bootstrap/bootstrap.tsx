import { createRoot } from 'react-dom/client';
import { initializeConfiguration, initializeI18n } from '../core';
import { App } from '../modules/app';

export async function bootstrap(document: NonElementParentNode): Promise<void> {
    const configuration = initializeConfiguration();
    const rootElement = document.getElementById(configuration.rootElementId);

    await initializeI18n();

    if (rootElement) {
        const root = createRoot(rootElement);
        root.render(<App configuration={configuration} />);
    }
}
