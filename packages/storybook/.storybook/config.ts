import { configure } from '@storybook/react';
import '@equisoft/design-elements-web/style/body.css';

const req = require.context('../stories', true, /\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
