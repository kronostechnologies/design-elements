import {
    BuildEnvironment,
    buildEnvironments,
    BuildTarget,
    buildTargets,
    Configuration,
    isBuildEnvironment,
    isBuildTarget,
} from './configuration';

function loadBuildEnvironment(fallback: BuildEnvironment = 'development'): BuildEnvironment {
    const nodeEnv: string = window.APP_CONFIG.ENVIRONMENT || fallback;

    if (isBuildEnvironment(nodeEnv)) {
        return nodeEnv;
    }

    console.warn(`'${nodeEnv}' is not a valid environment. Acceptable values are: ${buildEnvironments.join(', ')}. Falling back to '${fallback}'.`);
    return fallback;
}

function loadBuildTarget(fallback: BuildTarget = 'development'): BuildTarget {
    const buildTarget: string = window.APP_CONFIG.NODE_ENV || fallback;

    if (isBuildTarget(buildTarget)) {
        return buildTarget;
    }

    console.warn(`'${buildTarget}' is not a valid target. Acceptable values are: ${buildTargets.join(', ')}. Falling back to '${fallback}'.`);
    return fallback;
}

let initializedConfiguration: Configuration | null = null;

export function initializeConfiguration(): Configuration {
    if (!initializedConfiguration) {
        const buildEnvironment: BuildEnvironment = loadBuildEnvironment('development');
        const buildTarget: BuildTarget = loadBuildTarget(buildEnvironment === 'development'
            ? 'development'
            : 'production');
        const configuration: Configuration = {
            build: {
                environment: buildEnvironment,
                projectName: window.APP_CONFIG.PROJECT_NAME || '',
                target: buildTarget,
                version: `${window.APP_CONFIG.VERSION || '0.0.0'}`,
            },
            publicPath: window.APP_CONFIG.PUBLIC_PATH || '/',
            rootElementId: window.APP_CONFIG.ROOT_ELEMENT_ID || 'root',
        };

        if (configuration.build.target === 'development') {
            console.info('Loaded configuration', configuration);
        }

        initializedConfiguration = configuration;
    }

    return initializedConfiguration;
}
