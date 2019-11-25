import React from 'react';

import { ThemeWrapper } from '@equisoft/design-elements-react';
// tslint:disable-next-line:no-import-side-effect
import '@equisoft/design-elements-web/style/body.scss';
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
import { addDecorator, addParameters, configure } from '@storybook/react';

addDecorator(storyFn => <ThemeWrapper>{storyFn()}</ThemeWrapper>);

addParameters({
    docs: {
        container: DocsContainer,
        page: DocsPage,
    },
});

configure(require.context('../stories/', true, /\.stories\.(tsx|mdx)$/), module);
