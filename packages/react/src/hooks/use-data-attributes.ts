import { useEffect, useState } from 'react';

interface DataAttributes {
    [optName: `data-${string}`]: unknown;
}

function isObject(props: unknown): props is Record<string, unknown> & Iterable<unknown> {
    return props !== null && typeof props === 'object';
}

function isDataAttribute(key: string): key is `data-${string}` {
    return key.match(/data-/i) !== null;
}

function filterProps(props: unknown): DataAttributes {
    if (isObject(props)) {
        return Object.keys(props).reduce((acc, key) => {
            if (isDataAttribute(key)) {
                acc[key] = props[key];
            }
            return acc;
        }, {} as DataAttributes);
    }

    return {};
}

export function useDataAttributes(props: unknown): DataAttributes {
    const [dataAttributes, setDataAttributes] = useState(() => filterProps(props));
    const deps = isObject(props) ? [...Object.values(props)] : [props];

    useEffect(() => {
        setDataAttributes(filterProps(props));
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps

    return dataAttributes;
}
