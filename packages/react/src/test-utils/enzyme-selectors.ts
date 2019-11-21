import { ReactWrapper, ShallowWrapper } from 'enzyme';

type StartsWithModifier = '^';
type EndsWithModifier = '$';
type ContainsOptionalHyphenModifier = '|';
type ContainsModifier = '*';
type ContainsWordModifier = '~';
type NoModifier = '';
type SelectorModifier = StartsWithModifier
    | EndsWithModifier
    | ContainsOptionalHyphenModifier
    | ContainsModifier
    | ContainsWordModifier
    | NoModifier;

export function getByTestId<W extends ReactWrapper | ShallowWrapper>(
    wrapper: W,
    testId: string,
    modifier: SelectorModifier = '',
): W {
    return wrapper.find(`[data-testid${modifier}="${testId}"]`).at(0) as W;
}

export function findByTestId<W extends ReactWrapper | ShallowWrapper>(
    wrapper: W,
    testId: string,
    modifier: SelectorModifier = '',
): W {
    return wrapper.find(`[data-testid${modifier}="${testId}"]`) as W;
}
