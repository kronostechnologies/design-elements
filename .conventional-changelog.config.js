'use strict';

const config = require('conventional-changelog-conventionalcommits');

module.exports = config({
    types: [
        { type: 'feat', section: 'Features', hidden: false },
        { type: 'fix', section: 'Bug Fixes', hidden: false },
        { type: 'docs', section: 'Docs', hidden: false },
        { type: 'chore', section: 'Other', hidden: true },
        { type: 'style', section: 'Other', hidden: true },
        { type: 'refactor', section: 'Other', hidden: true },
        { type: 'perf', section: 'Other', hidden: true },
        { type: 'test', section: 'Other', hidden: true },
    ],
});
