import { configure } from '@storybook/react';

function loadStories() {
    const req = require.context('../stories', true, /\.jsx$/);
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
