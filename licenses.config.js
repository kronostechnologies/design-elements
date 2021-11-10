module.exports = {
    isValidLicense: (license) => {
        const valid = new RegExp('\\b(mit|apache\\b.*2|0?bsd|isc|unlicense|CC0-\\d\\.\\d|WTFPL)\\b', 'i');
        return valid.test(license);
    },
    ignorePackages: [
        'async-foreach', // missing -> MIT
        'axe-core', // Used by eslint-plugin-jsx-a11y
        'caniuse-lite', // missing -> CC-BY-4
        'domutils', // missing -> BSD-2
        'fast-shallow-equal', // missing -> Unlicense
        'fs-monkey', // missing -> Unlicense
        'full-icu', // devDependency - Unicode-DFS-2016 & MIT
        'language-subtag-registry', // Used by eslint-plugin-jsx-a11y
        'nano-css', // missing -> Unlicense
        'react-universal-interface', // missing -> Unlicense
        'spdx-exceptions', // devDependency - CC-BY-3.0
        'trim', // missing -> MIT
    ],
};
