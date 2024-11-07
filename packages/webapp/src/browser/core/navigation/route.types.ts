export interface RouteDefinition {
    path: string;
    getHref: (...args: any[]) => string;
    end?: boolean;
}

export type RouteCollection = {
    readonly [key: string]: Readonly<RouteDefinition>;
};
