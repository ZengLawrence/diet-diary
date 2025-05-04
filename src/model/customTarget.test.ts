import _ from 'lodash';
import { mutation, retrieval, validation } from './customTarget';

describe('validation', () => {

    const {
        isServingWithInRange,
        exceedsTotalCaloriesLimit,
        totalCaloriesLimit,
    } = validation;

    describe('isValid', () => {
        it('should return true for valid serving values', () => {
            expect(isServingWithInRange(0)).toBe(true);
            expect(isServingWithInRange(5)).toBe(true);
            expect(isServingWithInRange(9)).toBe(true);
        });

        it('should return false for serving values less than 0', () => {
            expect(isServingWithInRange(-1)).toBe(false);
            expect(isServingWithInRange(-10)).toBe(false);
        });

        it('should return false for serving values greater than 9', () => {
            expect(isServingWithInRange(10)).toBe(false);
            expect(isServingWithInRange(100)).toBe(false);
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

});

const ZERO_SERVING = {
    vegetable: 0,
    fruit: 0,
    carbohydrate: 0,
    proteinDiary: 0,
    fat: 0,
    sweet: 0
};

describe('mutation', () => {

    const { initTargets, update } = mutation;

    describe('initTargets', () => {
        it('should return default targets for calorie level 1200, 1400, 1600, 1800 and 2000', () => {
            const targets = initTargets();
            expect(targets).toEqual(expect.arrayContaining([
                expect.objectContaining({ calorie: 1200 }),
                expect.objectContaining({ calorie: 1400 }),
                expect.objectContaining({ calorie: 1600 }),
                expect.objectContaining({ calorie: 1800 }),
                expect.objectContaining({ calorie: 2000 })
            ]));
        });
    });

    describe('update', () => {
        it('should update the target in the array if it exists', () => {
            const targets = [
                { calorie: 1200, serving: ZERO_SERVING },
                { calorie: 1400, serving: ZERO_SERVING }
            ];
            const targetToUpdate = { calorie: 1200, serving: { ...ZERO_SERVING, vegetable: 5 } };
            expect(update(targets, targetToUpdate)).toBeTruthy();
            expect(targets[0]).toEqual(targetToUpdate);
        });

        it('should not update the target if it does not exist in the array', () => {
            const targets = [
                { calorie: 1200, serving: ZERO_SERVING },
                { calorie: 1400, serving: ZERO_SERVING }
            ];
            const targetToUpdate = { calorie: 1600, serving: ZERO_SERVING };
            const targetsBeforeUpdate = _.cloneDeep(targets);
            expect(update(targets, targetToUpdate)).toBeFalsy();
            expect(targets).toEqual(targetsBeforeUpdate);
        });

        it('should not update the target if it exceeds calorie limit', () => {
            const targets = [
                { calorie: 1200, serving: ZERO_SERVING },
                { calorie: 1400, serving: ZERO_SERVING },
                { calorie: 2000, serving: ZERO_SERVING }
            ];
            const targetToUpdate = {
                calorie: 2000,
                serving: {
                    vegetable: 5,
                    fruit: 4,
                    carbohydrate: 5,
                    proteinDiary: 9,
                    fat: 3,
                    sweet: 3
                }
            }; // Exceeds limit
            const targetsBeforeUpdate = _.cloneDeep(targets);
            expect(update(targets, targetToUpdate)).toBeFalsy();
            expect(targets).toEqual(targetsBeforeUpdate);
        });
    });
});

describe('retrieval', () => {
    const { getDefaultTarget } = retrieval;

    describe('getDefaultTarget', () => {
        it('should return the default target for a given calorie level', () => {
            const calorieLevel = 1200;
            expect(getDefaultTarget(calorieLevel)).toEqual(expect.objectContaining({ calorie: 1200 }));
        });

        it('should return calorie level 1600 for an invalid calorie level', () => {
            const calorieLevel = 999;
            expect(getDefaultTarget(calorieLevel)).toEqual(expect.objectContaining({ calorie: 1600 }));
        });
    });
});