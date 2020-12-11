#!/usr/bin/env node

const stylelint = require('stylelint');
const fs = require('fs/promises');
const path = require('path');
const yargs = require('yargs/yargs');
const { stylelintJunitFormat } = require('./stylelint-junit-formatter.js');

const PACKAGE_CWD = process.env.INIT_CWD;

const argv = yargs(process.argv)
    .demandCommand(1, 'At least 1 pattern is required')
    .argv;

async function writeJunitFile(results) {
    const outputDir = `${PACKAGE_CWD}/build/lint/style`;
    await fs.mkdir(outputDir, { recursive: true });

    const report = stylelintJunitFormat(results);
    await fs.writeFile(path.join(outputDir, 'junit.xml'), report);
}

(async function main() {
    const options = {
        config: require('../.stylelintrc'),
        files: argv._.slice(2),
        globbyOptions: {
            cwd: PACKAGE_CWD,
        },
    };

    const result = await stylelint.lint(options);

    const log = result.errored ? console.error : console.info;

    log(stylelint.formatters.unix(result.results));
    await writeJunitFile(result.results);

    process.exit(result.errored);
}());
