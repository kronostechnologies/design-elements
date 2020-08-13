// This file exists to that TypeScript can recognize the SVG files as components / modules
// Reference : https://stackoverflow.com/a/45887328

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module 'react-shadow/styled-components' {
    import * as React from 'react';

    interface Root {
        [name: string]: React.ComponentType;
    }

    const ReactShadowRoot: Root;

    export default ReactShadowRoot;
}
