import 'core-js/es6/set';
import Utils from 'js/utils/Utils';

describe('Utils functions', () => {
  it('randomFromRange must be a function', () => {
    expect(Utils.randomFromRange).toBeInstanceOf(Function);
  });

  describe('randomFromRange calls', () => {
    it('must be in range from 1 to 1', () => {
      expect(Utils.randomFromRange(1, 1)).toBe(1);
    });
    it('must be in range from 0 to 100', () => {
      expect(Utils.randomFromRange(0, 100)).toBeGreaterThanOrEqual(0);
      expect(Utils.randomFromRange(0, 100)).toBeLessThanOrEqual(100);
    });
  });
});