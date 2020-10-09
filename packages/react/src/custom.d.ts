// This file exists to that TypeScript can recognize the SVG files as components / modules
// Reference : https://stackoverflow.com/a/45887328

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.scss' {
    const content: string;
    export default content;
}

declare module '!!style-loader*' {
    function use(): void;

    function unuse(): void;
}

declare module '*.css' {
    const content: string;
    export default content;
}
