// tslint:disable-next-line:no-import-side-effect
import '@equisoft/design-elements-web/style/body.css';
import { configure } from '@storybook/react';

const req = require.context('../stories', true, /\.tsx$/);

function loadStories(): void {
    req.keys().forEach(req);
}

configure(loadStories, module);
