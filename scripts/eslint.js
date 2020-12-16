#!/usr/bin/env node

process.chdir(process.env.INIT_CWD);

function requireCwd(module) {
    return require(require.resolve(module, { paths: [process.cwd()] }));
}

const { ESLint } = requireCwd('eslint');
const fs = require('fs/promises');
const path = require('path');
const yargs = require('yargs/yargs');

const argv = yargs(process.argv)
    .demandCommand(1, 'At least 1 pattern is required')
    .argv;

const eslintConfig = {
    patterns: argv._.slice(2),
    quiet: !!argv.quiet,
    fix: !!argv.fix,
    ignorePatterns: argv.ignorePattern,
};

function getLintDecorator() {
    if (eslintConfig.quiet) {
        return ESLint.getErrorResults;
    }
    return (x) => x;
}

(async function main() {
    const fileFormatters = {
        junit: 'build/eslint/junit.xml',
        json: 'build/eslint/report.json',
    };

    const eslint = new ESLint({
        fix: eslintConfig.fix,
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        overrideConfig: {
            ignorePatterns: eslintConfig.ignorePatterns,
        },
    });

    const results = getLintDecorator()(await eslint.lintFiles(eslintConfig.patterns));

    if (eslintConfig.fix) {
        await ESLint.outputFixes(results);
    }

    const consoleFormatter = await eslint.loadFormatter();
    console.log(consoleFormatter.format(results));

    const formatPromises = Object.entries(fileFormatters).map(
        ([name, destination]) => fs.mkdir(path.dirname(destination), { recursive: true, mode: 0o755 })
            .then(async () => {
                const formatter = await eslint.loadFormatter(name);
                return fs.writeFile(
                    path.normalize(destination),
                    formatter.format(results),
                    { encoding: 'utf8' },
                );
            }),
    );

    await Promise.allSettled(formatPromises)
        .then((formatResults) => {
            const rejected = formatResults.filter((result) => result.status === 'rejected');
            if (rejected.length) {
                rejected.forEach((reason) => console.error('Failed to create output file.', reason));
                process.exit(1);
            } else if (formatResults.errorCount) {
                return process.exit(2);
            } else {
                return process.exit(0);
            }
        })
        .catch((error) => {
            console.error('Failed to create output files.', error);
            process.exit(1);
        });
}()).catch((error) => {
    console.error(error);
    process.exit(1);
});
