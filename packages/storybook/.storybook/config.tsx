import { DeviceContextProvider, ThemeWrapper } from '@equisoft/design-elements-react';
// tslint:disable-next-line:no-import-side-effect
import '@equisoft/design-elements-web/style/body.scss';
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
import { addDecorator, addParameters, configure } from '@storybook/react';
import React from 'react';

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

configure(require.context('../stories/', true, /\.stories\.(tsx|mdx)$/), module);
