// tslint:disable-next-line:no-import-side-effect
import '@equisoft/design-elements-web/style/body.css';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, configure } from '@storybook/react';
// const req = require.context('../stories', true, /\.stories\.tsx$/);

// function loadStories(): void {
//     req.keys().forEach(req);
// }

// configure(loadStories, module);

addDecorator(withKnobs);
configure(require.context('../stories/', true, /\.stories\.tsx$/), module);
