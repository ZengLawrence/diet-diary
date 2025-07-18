import { ReadOnlyCustomTargets } from "./customTarget";
import { Target } from "./Target";
import { Targets } from "./targets";

const ZERO_SERVING = {
  vegetable: 0,
  fruit: 0,
  carbohydrate: 0,
  proteinDiary: 0,
  fat: 0,
  sweet: 0
};

const ALL_TARGETS: Target[] = [
  { calorie: 1200, serving: ZERO_SERVING },
  { calorie: 1400, serving: ZERO_SERVING },
  { calorie: 1600, serving: ZERO_SERVING },
  { calorie: 1800, serving: ZERO_SERVING },
  { calorie: 2000, serving: ZERO_SERVING },
];

describe('Targets class', () => {
  describe('getByGender', () => {
    let targets: Targets;

    beforeEach(() => {
      const mockReadOnlyCustomTargets = {
        getAll: jest.fn(),
      } as unknown as jest.Mocked<ReadOnlyCustomTargets>;
      mockReadOnlyCustomTargets.getAll.mockReturnValueOnce(ALL_TARGETS);
      targets = new Targets(mockReadOnlyCustomTargets);
    });

    it('should return targets for woman', () => {
      const result = targets.getByGender('woman');
      expect(result.length).toBe(4);
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ calorie: 1200}),
          expect.objectContaining({ calorie: 1400}),
          expect.objectContaining({ calorie: 1600}),
          expect.objectContaining({ calorie: 1800}),
        ])
      );
    });

    it('should return targets for man', () => {
      const result = targets.getByGender('man');
      expect(result.length).toBe(4);
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ calorie: 1400}),
          expect.objectContaining({ calorie: 1600}),
          expect.objectContaining({ calorie: 1800}),
          expect.objectContaining({ calorie: 2000}),
        ])
      );
    });
  });

});
