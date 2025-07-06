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
    it('should return targets for woman', () => {
      const mockReadOnlyCustomTargets = {
        getAll: jest.fn(),
      } as unknown as jest.Mocked<ReadOnlyCustomTargets>;
      mockReadOnlyCustomTargets.getAll.mockReturnValueOnce(ALL_TARGETS);

      const targets = new Targets(mockReadOnlyCustomTargets);
      expect(targets.getByGender('woman')).toStrictEqual([
        { calorie: 1200, serving: ZERO_SERVING },
        { calorie: 1400, serving: ZERO_SERVING },
        { calorie: 1600, serving: ZERO_SERVING },
        { calorie: 1800, serving: ZERO_SERVING },
      ]);
    });
  });

});
