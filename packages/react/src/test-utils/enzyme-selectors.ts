import { ReactWrapper, ShallowWrapper } from 'enzyme';

enum ModifierEnum {
    StartsWith = '^',
    EndsWith = '$',
    ContainsOptionalHyphen = '|',
    Contains = '*',
    ContainsWord = '~',
    None = '',
}
type SelectorModifier = `${ModifierEnum}`;

function filterHtmlNodesOnly<W extends ReactWrapper | ShallowWrapper>(
    nodes: W,
): W {
    return nodes
        .hostNodes()
        .filterWhere((x) => x.name() !== null && !x.name().startsWith('styled.')) as W;
}

export function findByTestId<W extends ReactWrapper | ShallowWrapper>(
    wrapper: W,
    testId: string,
    options?: {
        modifier?: SelectorModifier,
        nodeName?: string,
        // Don't use with shallow wrapper as it contains styled node over the html nodes.
        htmlNodesOnly?: boolean,
    },
): W {
    const modifier = options?.modifier ?? '';

    let nodes = wrapper.find(`[data-testid${modifier}="${testId}"]`) as W;

    if (options?.nodeName) {
        nodes = nodes.filterWhere((x) => x.name() === options.nodeName) as W;
    }
    if (options?.htmlNodesOnly) {
        nodes = filterHtmlNodesOnly(nodes);
    }

    return nodes;
}

export function getByTestId<W extends ReactWrapper | ShallowWrapper>(
    wrapper: W,
    testId: string,
    options?: {
        modifier?: SelectorModifier,
        nodeName?: string,
        // Don't use with shallow wrapper as it contains styled node instead of the html nodes.
        htmlNodesOnly?: boolean,
    },
): W {
    return findByTestId(wrapper, testId, options).at(0) as W;
}
