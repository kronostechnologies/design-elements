import { AsymmetricMatcher } from 'expect/build/asymmetricMatchers';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        // @ts-ignore (Clashes with interface declared in https://github.com/styled-components/jest-styled-components)
        interface Matchers<R> {
            toMatchFormattedMoney(expected: string): R;
        }

        interface Expect {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formattedMoneyMatching(expected: string): any;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formattedMoneyNotMatching(expected: string): any;
        }
    }
}

function isMatchingFormattedMoney(received: string, expected: string): boolean {
    return received.replace(/\s/g, ' ') === expected;
}

class FormattedMoneyMatching extends AsymmetricMatcher<string> {
    constructor(expected: string, inverse = false) {
        super(expected);

        this.inverse = inverse;
    }

    asymmetricMatch(other: string): boolean {
        const match = isMatchingFormattedMoney(other, this.sample);
        return this.inverse ? !match : match;
    }

    toString(): string {
        return `FormattedMoney${this.inverse ? 'Not' : ''}Matching`;
    }

    getExpectedType(): string {
        return 'string';
    }
}

export function extendExpectWithMoney(): void {
    expect.formattedMoneyMatching = (expected: string) => new FormattedMoneyMatching(expected);
    expect.formattedMoneyNotMatching = (expected: string) => new FormattedMoneyMatching(expected, true);

    expect.extend({
        toMatchFormattedMoney(received: string, expected: string): jest.CustomMatcherResult {
            const pass = isMatchingFormattedMoney(received, expected);
            const message: () => string = () => `expected ${received} to match ${expected}`;

            return { pass, message };
        },
    });
}
