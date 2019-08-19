import { configure } from '@storybook/react';
import '@equisoft/design-elements-web/style/body.scss';

const req = require.context('../stories', true, /\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
