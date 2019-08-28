import '@equisoft/design-elements-web/style/body.css';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, configure } from '@storybook/react';

addDecorator(withKnobs);
const req = require.context('../stories', true, /\.tsx$/);

function loadStories(): void {
    req.keys().forEach(req);
}

configure(loadStories, module);
