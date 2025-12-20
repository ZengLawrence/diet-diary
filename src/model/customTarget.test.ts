import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { mock } from "jest-mock-extended";
import type { CustomTargetListener, CustomTargetsLoader, CustomTargetsSaver} from './customTarget';
import { CustomTargets, ReadOnlyCustomTargets, retrieval, validation } from './customTarget';
import type { FoodGroup } from './Food';

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

describe('CustomTargets class', () => {
    const mockLoader = mock<CustomTargetsLoader>();
    let mockSaver: jest.Mocked<CustomTargetsSaver>;
    let customTargets: CustomTargets;

    beforeEach(() => {
        const targets = [
            { calorie: 1200, serving: ZERO_SERVING },
            { calorie: 1400, serving: ZERO_SERVING },
            { calorie: 1600, serving: ZERO_SERVING },
            { calorie: 1800, serving: ZERO_SERVING },
            { calorie: 2000, serving: ZERO_SERVING },
        ];
        mockLoader.load.mockReturnValue(targets);
        mockSaver = {
            save: jest.fn(),
        };
        customTargets = new CustomTargets(mockLoader, mockSaver);
    })

    describe('update', () => {
        it('should return true, and call loader.load and saver.save when updating a target', () => {

            const targetToUpdate = { calorie: 1200, serving: { ...ZERO_SERVING, vegetable: 5 } };

            expect(customTargets.update(targetToUpdate)).toBeTruthy();
            expect(mockLoader.load).toHaveBeenCalled();
            expect(mockSaver.save).toHaveBeenCalledWith([
                { calorie: 1200, serving: { ...ZERO_SERVING, vegetable: 5 } },
                { calorie: 1400, serving: ZERO_SERVING },
                { calorie: 1600, serving: ZERO_SERVING },
                { calorie: 1800, serving: ZERO_SERVING },
                { calorie: 2000, serving: ZERO_SERVING },
            ]);
        });

        it('should return true, and call loader.load and saver.save when updating a target and loader returns empty array', () => {
            mockLoader.load.mockReturnValueOnce([]);
            const targetToUpdate = { calorie: 1200, serving: { ...ZERO_SERVING, vegetable: 5 } };

            expect(customTargets.update(targetToUpdate)).toBeTruthy();
            expect(mockSaver.save).toHaveBeenCalledWith(expect.arrayContaining([
                { calorie: 1200, serving: { ...ZERO_SERVING, vegetable: 5 } },
            ]));
        });

        it('should return false, and not call saver.save when the target does not exist', () => {
            const targetToUpdate = { calorie: 0, serving: ZERO_SERVING };

            expect(customTargets.update(targetToUpdate)).toBeFalsy();
            expect(mockLoader.load).toHaveBeenCalled();
            expect(mockSaver.save).not.toHaveBeenCalled();
        });

        it('should return false, and not call saver.save when the target exceeds calorie limit', () => {
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

            expect(customTargets.update(targetToUpdate)).toBeFalsy();
            expect(mockLoader.load).toHaveBeenCalled();
            expect(mockSaver.save).not.toHaveBeenCalled();
        });

        // Parameterized test for each food group.
        const foodGroup: FoodGroup[] = ["vegetable", "fruit", "carbohydrate", "proteinDiary", "fat", "sweet"];
        it.each(foodGroup)(
            'should return false, and not call saver.save when %s serving value is outside lower limit of range',
            (servingType) => {
                const invalidTargetToUpdate = {
                    calorie: 1200,
                    serving: {
                        ...ZERO_SERVING,
                        [servingType]: -1
                    }
                };

                expect(customTargets.update(invalidTargetToUpdate)).toBeFalsy();
                expect(mockLoader.load).toHaveBeenCalled();
                expect(mockSaver.save).not.toHaveBeenCalled();
            }
        );

        it.each(foodGroup)(
            'should return false, and not call saver.save when %s serving value is outside upper limit of range',
            (servingType) => {
                const invalidTargetToUpdate = {
                    calorie: 1200,
                    serving: {
                        ...ZERO_SERVING,
                        [servingType]: 10
                    }
                };

                expect(customTargets.update(invalidTargetToUpdate)).toBeFalsy();
                expect(mockLoader.load).toHaveBeenCalled();
                expect(mockSaver.save).not.toHaveBeenCalled();
            }
        );
    });

    describe('listener notification', () => {
        let listener: jest.Mocked<CustomTargetListener>;

        beforeEach(() => {
            listener = {
                targetsUpdated: jest.fn(),
                targetUpdated: jest.fn(),
            }
        });

        it('notify listener if there is an update', () => {
            customTargets.registerListener(listener);

            const targetToUpdate = { calorie: 1200, serving: { ...ZERO_SERVING, vegetable: 5 } };
            expect(customTargets.update(targetToUpdate)).toBeTruthy();
            expect(listener.targetsUpdated).toHaveBeenCalledWith([
                { calorie: 1200, serving: { ...ZERO_SERVING, vegetable: 5 } },
                { calorie: 1400, serving: ZERO_SERVING },
                { calorie: 1600, serving: ZERO_SERVING },
                { calorie: 1800, serving: ZERO_SERVING },
                { calorie: 2000, serving: ZERO_SERVING },
            ]);
            expect(listener.targetUpdated).toHaveBeenCalledWith(targetToUpdate);

            // tear down
            customTargets.unregisterListener(listener);
        });

        it('do not notify listener if no update', () => {
            customTargets.registerListener(listener);

            const invalidTarget = { calorie: 1200, serving: { ...ZERO_SERVING, vegetable: -1 } };
            expect(customTargets.update(invalidTarget)).toBeFalsy();
            expect(listener.targetsUpdated).not.toHaveBeenCalled();

            // tear down
            customTargets.unregisterListener(listener);
        });

        it('do not notify listener if listener is not registered', () => {
            const targetToUpdate = { calorie: 1200, serving: { ...ZERO_SERVING, vegetable: 5 } };
            expect(customTargets.update(targetToUpdate)).toBeTruthy();
            expect(listener.targetsUpdated).not.toHaveBeenCalled();
        });

        it('do not notify listener after listener is unregistered', () => {
            customTargets.registerListener(listener);
            const targetToUpdate = { calorie: 1200, serving: { ...ZERO_SERVING, vegetable: 5 } };
            expect(customTargets.update(targetToUpdate)).toBeTruthy();
            expect(listener.targetsUpdated).toHaveBeenCalled();

            listener.targetsUpdated.mockClear();
            
            customTargets.unregisterListener(listener);
            expect(customTargets.update(targetToUpdate)).toBeTruthy();
            expect(listener.targetsUpdated).not.toHaveBeenCalled();
        });
    });
});

describe('ReadOnlyCustomTargets class', () => {
    describe('getAll', () => {
        it('should return all targets loaded by the loader', () => {
            const targets = [
                { calorie: 1200, serving: ZERO_SERVING },
                { calorie: 1400, serving: ZERO_SERVING }
            ];
            const mockLoader = mock<CustomTargetsLoader>();
            mockLoader.load.mockReturnValueOnce(targets);
            const customTargets = new ReadOnlyCustomTargets(mockLoader);
            expect(customTargets.getAll()).toEqual(targets);
            expect(mockLoader.load).toHaveBeenCalled();
        });

        it('should return default targets with 5 calorie levels if loader returns an empty array', () => {
            const mockLoader = mock<CustomTargetsLoader>();
            mockLoader.load.mockReturnValueOnce([]);
            const customTargets = new ReadOnlyCustomTargets(mockLoader);
            const result = customTargets.getAll();
            expect(result.length).toBe(5);
            expect(result).toEqual(expect.arrayContaining([
                expect.objectContaining({ calorie: 1200 }),
                expect.objectContaining({ calorie: 1400 }),
                expect.objectContaining({ calorie: 1600 }),
                expect.objectContaining({ calorie: 1800 }),
                expect.objectContaining({ calorie: 2000 })
            ]));
            expect(mockLoader.load).toHaveBeenCalled();
        });
    });
}); 