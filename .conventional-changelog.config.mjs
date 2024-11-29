'use strict';

import config from 'conventional-changelog-conventionalcommits';

export default config({
    types: [
        { type: 'feat', section: 'Features', hidden: false },
        { type: 'fix', section: 'Bug Fixes', hidden: false },
        { type: 'deps', section: 'Dependencies', hidden: false },
        { type: 'docs', section: 'Docs', hidden: false },
        { type: 'chore', section: 'Other', hidden: true },
        { type: 'style', section: 'Other', hidden: true },
        { type: 'refactor', section: 'Other', hidden: false },
        { type: 'perf', section: 'Other', hidden: true },
        { type: 'test', section: 'Other', hidden: true },
    ],
});
