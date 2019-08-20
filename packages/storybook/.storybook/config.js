import { configure } from '@storybook/react';
import '@equisoft/design-elements-web/style/body.css';

function loadStories() {
    const req = require.context('../stories', true, /\.jsx$/);
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
