export const buildEnvironments = ['development', 'production', 'test'] as const;
export type BuildEnvironment = typeof buildEnvironments[number];

export function isBuildEnvironment(value: unknown): value is BuildEnvironment {
    return buildEnvironments.some((t) => t === value);
}

export const buildTargets = ['development', 'production'] as const;
export type BuildTarget = typeof buildTargets[number];

export function isBuildTarget(value: unknown): value is BuildTarget {
    return buildTargets.some((t) => t === value);
}

export interface BuildConfiguration {
    environment: BuildEnvironment;
    projectName: string;
    target: BuildTarget;
    version: string;
}

export interface Configuration {
    build: BuildConfiguration;
    publicPath: string;
    rootElementId: string;
}
