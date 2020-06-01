// tslint:disable-next-line:no-import-side-effect
import '@equisoft/design-elements-web/style/body.scss';
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
import { addDecorator, addParameters, configure } from '@storybook/react';
import React from 'react';

import { DeviceContextProvider } from '@design-elements/components/device-context-provider/device-context-provider';
import { ThemeWrapper } from '@design-elements/components/theme-wrapper/theme-wrapper';

addDecorator(storyFn => (
    <DeviceContextProvider>
            <ThemeWrapper>
                {storyFn()}
            </ThemeWrapper>
    </DeviceContextProvider>
));

addParameters({
    docs: {
        container: DocsContainer,
        page: DocsPage,
    },
});

configure(require.context('../src/', true, /\.stories\.(tsx|mdx)$/), module);
