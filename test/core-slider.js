const { assert } = require('chai');
const showroom = require('showroom/puppeteer')();

/**
 * Mocha testing for core slider
 */
describe('core-slider', () => {
  /**
   * before test start to run, start showroom and puppeteer
   */
  before(async () => {
    await showroom.start();
  });

  /**
   * after test complete, stop showroom and puppeteer
   */
  after(async () => {
    await showroom.stop();
  });

  /**
   * For each unit test, creat a clean core-slider component
   */
  beforeEach(async () => {
    await showroom.setTestSubject('core-slider');
  });

  /**
   * Tests for Value Attribute of Core-Slider
   */
  it('The value attribute of slider should be set to 70', async () => {
    const testAttr = 'value';
    const testValue = 70;

    await showroom.setAttribute(testAttr, testValue);
    const valueAttr = await showroom.getAttribute(testAttr);
    assert.equal(valueAttr, testValue);
  });
});
