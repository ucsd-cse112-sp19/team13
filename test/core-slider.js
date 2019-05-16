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
   * Tests for value Attribute of Core-Slider
   */
  it('The value attribute of slider should be set to 70', async () => {
    const testAttr = 'value';
    const testValue = 70;

    await showroom.setAttribute(testAttr, testValue);
    const valueAttr = await showroom.getAttribute(testAttr);
    assert.equal(valueAttr, testValue);
  });

  /**
   * Tests for min Attribute of Core-Slider
   */
  it('The min attribute of slider should be set to 10', async () => {
    const testAttr = 'min';
    const testValue = 10;

    await showroom.setAttribute(testAttr, testValue);
    const minAttr = await showroom.getAttribute(testAttr);
    assert.equal(minAttr, testValue);
  });

  /**
   * Tests for max Attribute of Core-Slider
   */
  it('The max attribute of slider should be set to 120', async () => {
    const testAttr = 'max';
    const testValue = 120;

    await showroom.setAttribute(testAttr, testValue);
    const maxAttr = await showroom.getAttribute(testAttr);
    assert.equal(maxAttr, testValue);
  });

  /**
   * Tests for disabled Attribute of Core-Slider
   */
  it('The disabled attribute of slider should be exist', async () => {
    const testAttr = 'disabled';

    await showroom.setAttribute(testAttr);
    const disabledAttr = await showroom.hasAttribute(testAttr);
    assert.equal(disabledAttr, true);
  });

  /**
   * Tests for step size
   */
  it('The step increment should be correctly assigned', async () => {
    const testAttr = 'step';
    const testValue = 15;

    await showroom.setAttribute(testAttr, testValue);
    const stepSize = await showroom.getAttribute(testAttr);

    assert.equal(stepSize, testValue);
  });
});
