function sum(...rest) {
  let count = 0;
  for (let i = 0; i < arguments.length; i += 1) {
    if (typeof rest[i] !== 'number') {
      throw new TypeError('sum() only expects numbers');
    }
    count += rest[i];
  }
  return count;
}

module.exports.sum = sum;
