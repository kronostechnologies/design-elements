import { configure } from '@storybook/react';
import '@equisoft/design-elements-web/style/body.scss';

function loadStories() {
    const req = require.context('../stories', true, /\.jsx$/);
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
