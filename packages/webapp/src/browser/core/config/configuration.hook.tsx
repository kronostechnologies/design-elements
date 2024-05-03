import { FunctionComponent, PropsWithChildren, useContext, useState } from 'react';
import { createStatefulContext } from '../../utils/hooks';
import { Configuration } from './configuration';

export interface ConfigurationProviderProps {
    configuration: Configuration;
}

// We handle the initial value in the provider. There are no decent defaults we can use here.
const ConfigurationContext = createStatefulContext<Configuration>(null as never);

export const ConfigurationProvider: FunctionComponent<PropsWithChildren<ConfigurationProviderProps>> = ({
    children,
    configuration,
}) => {
    const state = useState(configuration);
    return (
        <ConfigurationContext.Provider value={state}>
            {children}
        </ConfigurationContext.Provider>
    );
};

export interface UseConfigurationResponse {
    configuration: Configuration;
}

export function useConfiguration(): UseConfigurationResponse {
    const [configuration] = useContext(ConfigurationContext);
    if (!configuration) {
        throw new Error(
            'useConfiguration() must be used within a ConfigurationProvider and use a non-null default value.',
        );
    }

    return { configuration };
}
