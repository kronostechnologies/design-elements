export interface RouteDefinition {
    path: string;
    getHref: (...args: string[]) => string;
    end?: boolean;
}

export type RouteCollection = {
    readonly [key: string]: Readonly<RouteDefinition>;
};
