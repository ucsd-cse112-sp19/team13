const { expect } = require('chai').expect;
const { sum } = require('../sum');

describe('#sum()', () => {
  context('without arguments', () => {
    it('should return 0', () => {
      expect(sum()).to.equal(0);
    });
  });

  context('with number arguments', () => {
    it('should return the sum of arguments', () => {
      expect(sum(1, 2, 3, 4, 5)).to.equal(15);
    });

    it('should return itself if one argument is passed', () => {
      expect(sum(9)).to.equal(9);
    });
  });

  context('with non-number arguments', () => {
    it('should throw a TypeError', () => {
      expect(() => {
        sum(1, 2, '3', [4], 5);
      }).to.throw(TypeError, 'sum() only expects numbers');
    });
  });
});
