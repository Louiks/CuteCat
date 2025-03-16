import { StrengthenPipe } from './strengthen.pipe';

describe('StrengthenPipe', () => {
    let pipe: StrengthenPipe;

    beforeEach(() => {
        pipe = new StrengthenPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return the same value if input is empty', () => {
        // given
        const input: string = '';

        // when
        const result: string = pipe.transform(input);

        // then
        expect(result).toBe(input);
    });

    it('should wrap the first word in <strong> tags', () => {
        // given
        const input: string = 'hello world';
        const expectedResult: string = '<strong>hello</strong> world';

        // when
        const result: string = pipe.transform(input);

        // then
        expect(result).toBe(expectedResult);
    });

    it('should handle single word input', () => {
        // given
        const input: string = 'hello';
        const expectedResult: string = '<strong>hello</strong>';

        // when
        const result: string = pipe.transform(input);

        // then
        expect(result).toBe(expectedResult);
    });
});