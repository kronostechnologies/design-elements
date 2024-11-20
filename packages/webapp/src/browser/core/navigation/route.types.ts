import { FunctionComponent } from 'react';

export interface RouteDefinition {
    path: string;
    component: FunctionComponent;
    end?: boolean;
}

export type RouteCollection = {
    readonly [key: string]: Readonly<RouteDefinition>;
};
