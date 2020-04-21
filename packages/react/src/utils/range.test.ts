import { range } from '@design-elements/utils/range';

describe('ranges', () => {
    it('should contain start and end', () => {
        const result = range(-2, 2);

        expect(result).toEqual([-2, -1, 0, 1, 2]);
    });
});
