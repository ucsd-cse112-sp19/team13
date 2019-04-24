import { expect } from 'chai';
import sum from '../sum';

describe('#sum()', () => {
  context('without arguments', () => {
    it('should return 0', () => {
      expect(sum()).to.equal(0);
    });
  });
});
