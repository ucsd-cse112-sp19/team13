var sum = require('../sum.js');
var expect = require('chai').expect;

describe('#sum()', () => {
context('without arguments', () => {
it('should return 0', () => {
expect(sum()).to.equal(0);
})
})

})
