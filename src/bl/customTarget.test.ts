import { isValid } from './CustomTarget';

describe('isValid', () => {
    it('should return true for valid serving values', () => {
        expect(isValid(0)).toBe(true);
        expect(isValid(5)).toBe(true);
        expect(isValid(9)).toBe(true);
    });

    it('should return false for serving values less than 0', () => {
        expect(isValid(-1)).toBe(false);
        expect(isValid(-10)).toBe(false);
    });

    it('should return false for serving values greater than 9', () => {
        expect(isValid(10)).toBe(false);
        expect(isValid(100)).toBe(false);
    });
});