import { exceedsTotalCaloriesLimit, isValid, totalCaloriesLimit } from './customTarget';

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

describe('exceedsTotalCaloriesLimit', () => {
    it('should return true if total calories exceed the limit', () => {
        const target = {
            serving: {
                vegetable: 5,
                fruit: 4,
                carbohydrate: 5,
                proteinDiary: 9,
                fat: 3,
                sweet: 3
            }
        }; // 2065 calorie
        const calorieLevel = 2000;
        expect(exceedsTotalCaloriesLimit(target, calorieLevel)).toBe(true);
    });

    it('should return false if total calories do not exceed the limit', () => {
        const target = {
            serving: {
                vegetable: 5,
                fruit: 4,
                carbohydrate: 6,
                proteinDiary: 9,
                fat: 3,
                sweet: 2
            }
        }; // 2060 calorie
        const calorieLevel = 2000;
        expect(exceedsTotalCaloriesLimit(target, calorieLevel)).toBe(false);
    });
})

describe('totalCaloriesLimit', () => {
    it('should return the correct limit when a calorie level is provided', () => {
        expect(totalCaloriesLimit(2000)).toBe(2060);
        expect(totalCaloriesLimit(1500)).toBe(1560);
        expect(totalCaloriesLimit(0)).toBe(60);
    });

    it('should handle negative calorie levels correctly', () => {
        expect(totalCaloriesLimit(-100)).toBe(-40);
        expect(totalCaloriesLimit(-500)).toBe(-440);
    });
});
