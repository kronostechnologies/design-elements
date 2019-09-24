// tslint:disable-next-line:no-import-side-effect
import '@equisoft/design-elements-web/style/body.css';
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks';
import { addParameters, configure } from '@storybook/react';

addParameters({
    docs: {
        container: DocsContainer,
        page: DocsPage,
    },
});

// const req = require.context('../stories', true, /\.stories\.tsx$/);

// function loadStories(): void {
//     req.keys().forEach(req);
// }

// configure(loadStories, module);
configure(require.context('../stories/', true, /\.stories\.tsx$/), module);
