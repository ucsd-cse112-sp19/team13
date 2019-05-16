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
   * Tests for Default State property of Core-Slider
   */
  it('The default slider should has min=1 max=100 value=1', async () => {
    const minAttr = await showroom.getAttribute('min');
    const maxAttr = await showroom.getAttribute('max');
    const valueAttr = await showroom.getAttribute('value');

    assert.equal(minAttr, '1');
    assert.equal(maxAttr, '100');
    assert.equal(valueAttr, '1');
  });

  /**
   * Tests for Initialized State property of Core-Slider
   * TODO: what is difference with the value attribute
   */

  /**
   * Tests for Rainbow Attribute of Core-Slider
   */
  it('The rainbow attribute of slider should be exist', async () => {
    const testAttr = 'rainbow';

    await showroom.setAttribute(testAttr);
    const rainbowAttr = await showroom.hasAttribute(testAttr);
    assert.equal(rainbowAttr, true);
  });

  /**
   * Tests for value Attribute of Core-Slider
   */
  it('The value attribute of slider should be set to 70', async () => {
    const testAttr = 'value';
    const testValue = '70';

    await showroom.setAttribute(testAttr, testValue);
    const valueAttr = await showroom.getAttribute(testAttr);
    assert.equal(valueAttr, testValue);
  });

  /**
   * Tests for min Attribute of Core-Slider
   */
  it('The min attribute of slider should be set to 10', async () => {
    const testAttr = 'min';
    const testValue = '10';

    await showroom.setAttribute(testAttr, testValue);
    const minAttr = await showroom.getAttribute(testAttr);
    assert.equal(minAttr, testValue);
  });

  /**
   * Tests for max Attribute of Core-Slider
   */
  it('The max attribute of slider should be set to 120', async () => {
    const testAttr = 'max';
    const testValue = '120';

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
   * TODO
   * Tests for range Attribute of Core-Slider
   */

  /**
   * Tests for vertical attribute of Core-Slider
   */
  it('The vertical attribute of slider should be exist', async () => {
    const testAttr = 'vertical';

    await showroom.setAttribute(testAttr);
    const verticalAttr = await showroom.hasAttribute(testAttr);
    assert.equal(verticalAttr, true);
  });

  /**
   * TODO
   * Tests for height Attribute of Core-Slider
   */

  /**
   * TODO
   * Tests for change color Attribute of Core-Slider
   */
});
