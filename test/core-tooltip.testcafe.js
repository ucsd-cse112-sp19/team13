/* eslint-disable no-unused-vars */
import { ClientFunction, Selector } from 'testcafe';
import { TestCoreElement, ShadowChildSelector, ShadowRootSelector } from './testcore';

/* eslint-disable */
fixture `core-tooltip tests`
    .page `./core-tooltip-index.html`;
/* eslint-enable */
/* eslint-disable no-unused-vars */

function testCoreTooltip(sectionName, testDesc, testFunc) {
  TestCoreElement('core-tooltip', sectionName, testDesc, testFunc);
}

/* eslint-disable no-eval */
/**
 * Purpose: calls and returns the value of get strAttrName of the tooltip with id strElemId
 *
 * @param {String} strAttrName the name of the attribute to get
 * @param {String} strElemId the id of the tested element.
 */
const getCoreAttribute = ClientFunction((strAttrName, strElemId) => {
  const testElement = document.getElementById(strElemId);
  const getExpression = `testElement.getAttribute('${strAttrName}')`;
  return eval(getExpression);
});

/**
 * Purpose: calls set strAttrName of the tooltip with id strElemId
 * Note: the return value is an empty string and has no meaning
 *
 * @param {String} strAttrName the name of the attribute to get
 * @param {String} strElemId the id of the tested element.
 * @param value the value strAttrName should be set to.
 */
const setCoreAttribute = ClientFunction((strAttrName, strElemId, value) => {
  const testElement = document.getElementById(strElemId);
  // set the strAttrName to value
  const setExpression = `testElement.setAttribute('${strAttrName}', '${value}')`;
  eval(setExpression);
  return '';
});
/* eslint-enable */
/* eslint-disable no-unused-vars */

/**
 * Purpose: checks that the background color of the tooltip is dark when effect=dark
 * Test Attribute: effect
 * Test Description: dark effect
 */
testCoreTooltip('effect', '- dark effect', async (t, ctx) => {
  const tooltipBox = ShadowChildSelector(t, { targetQuerySelector: '#effect-dark' }, '#tooltip-back');
  await t
    .expect(tooltipBox.getStyleProperty('background-color'))
    .eql('rgb(0, 0, 0)');
});

/**
 * Purpose: checks that the background color of the tooltip is light when effect=light
 * Test Attribute: effect
 * Test Description: light effect
 */
testCoreTooltip('effect', '- light effect', async (t, ctx) => {
  const tooltipBox = ShadowChildSelector(t, { targetQuerySelector: '#effect-light' }, '#tooltip-back');
  await t
    .expect(tooltipBox.getStyleProperty('background-color'))
    .eql('rgb(255, 255, 255)');
});

/**
 * Purpose: checks that the tooltip can be displayed by hovering over parent
 * Test Attribute: hoverable
 * Test Description: check the component is hoverable
 */
testCoreTooltip('hoverable', '- check the component is hoverable', async (t, ctx) => {
  const tooltip = Selector('#hoverable-tooltip');
  const tooltipBox = Selector('#hoverable-tooltip-box');
  await t
    .hover(tooltip)
    .expect(tooltipBox.getStyleProperty('opacity'))
    .eql('1');
});

/**
 * Purpose: checks that the tooltip disappears after hovering over a different tooltip
 * Test Attribute: closedelay
 * Test Description: check the previous tooltip hide after hover for new tooltip
 */
testCoreTooltip('closedelay', '- check the previous tooltip hide after hover for new tooltip', async (t, ctx) => {
  const tooltip1 = Selector('#closedelay-tooltip1');
  const tooltip2 = Selector('#closedelay-tooltip2');
  const tooltipBox1 = Selector('#closedelay-tooltip1-box');
  // const tooltipBox2 = Selector('#closedelay-tooltip2-box');
  await t
    .hover(tooltip1)
    .expect(tooltipBox1.getStyleProperty('opacity'))
    .eql('1');

  // move to tooltip 2, tooltip 1 should stil appear
  await t
    .hover(tooltip2)
    .expect(tooltipBox1.getStyleProperty('opacity'))
    .eql('1');

  // after 2 sec, tooltip 1 should be hide
  await t
    .wait(2000)
    .expect(tooltipBox1.getStyleProperty('opacity'))
    .eql('0');
});

/**
 * Purpose: checks that the tooltip appears to the right of the parent
 * Test Attribute: placement
 * Test Description: placement location: right
 */
testCoreTooltip('placement', '- placement location: right', async (t, ctx) => {
  const tooltipHost = Selector('#label-right');
  const tooltipBox = ShadowChildSelector(t, { targetQuerySelector: '#right' }, '#tooltip-back');

  const hostCoordinateLeft = await tooltipHost.getBoundingClientRectProperty('left');
  const tooltipCoordinateLeft = await tooltipBox.getBoundingClientRectProperty('left');

  const hostCoordinateRight = await tooltipHost.getBoundingClientRectProperty('right');
  const tooltipCoordinateRight = await tooltipBox.getBoundingClientRectProperty('right');

  await t
    .expect(tooltipCoordinateLeft)
    .gt(hostCoordinateLeft)
    .expect(tooltipCoordinateRight)
    .gt(hostCoordinateRight);
});

/**
 * Purpose: checks that the tooltip appears to the left of the parent
 * Test Attribute: placement
 * Test Description: placement location: left
 */
testCoreTooltip('placement', '- placement location: left', async (t, ctx) => {
  const tooltipHost = Selector('#label-left');
  const tooltipBox = ShadowChildSelector(t, { targetQuerySelector: '#left' }, '#tooltip-back');

  const hostCoordinateLeft = await tooltipHost.getBoundingClientRectProperty('left');
  const tooltipCoordinateLeft = await tooltipBox.getBoundingClientRectProperty('left');

  const hostCoordinateRight = await tooltipHost.getBoundingClientRectProperty('right');
  const tooltipCoordinateRight = await tooltipBox.getBoundingClientRectProperty('right');

  await t
    .expect(tooltipCoordinateLeft)
    .lt(hostCoordinateLeft)
    .expect(tooltipCoordinateRight)
    .lt(hostCoordinateRight);
});

/**
 * Purpose: checks that the tooltip appears above the parent
 * Test Attribute: placement
 * Test Description: placement location: up
 */
testCoreTooltip('placement', '- placement location: up', async (t, ctx) => {
  const tooltipHost = Selector('#label-up');
  const tooltipBox = ShadowChildSelector(t, { targetQuerySelector: '#up' }, '#tooltip-back');

  const hostCoordinateTop = await tooltipHost.getBoundingClientRectProperty('top');
  const tooltipCoordinateTop = await tooltipBox.getBoundingClientRectProperty('top');

  const hostCoordinateBottom = await tooltipHost.getBoundingClientRectProperty('bottom');
  const tooltipCoordinateBottom = await tooltipBox.getBoundingClientRectProperty('bottom');

  await t
    .expect(tooltipCoordinateTop)
    .lt(hostCoordinateTop)
    .expect(tooltipCoordinateBottom)
    .lt(hostCoordinateBottom);
});

/**
 * Purpose: checks that the tooltip appears below the parent
 * Test Attribute: placement
 * Test Description: placement location: bottom
 */
testCoreTooltip('placement', '- placement location: bottom', async (t, ctx) => {
  const tooltipHost = Selector('#label-bottom');
  const tooltipBox = ShadowChildSelector(t, { targetQuerySelector: '#bottom' }, '#tooltip-back');

  const hostCoordinateTop = await tooltipHost.getBoundingClientRectProperty('top');
  const tooltipCoordinateTop = await tooltipBox.getBoundingClientRectProperty('top');

  const hostCoordinateBottom = await tooltipHost.getBoundingClientRectProperty('bottom');
  const tooltipCoordinateBottom = await tooltipBox.getBoundingClientRectProperty('bottom');

  await t
    .expect(tooltipCoordinateTop)
    .gt(hostCoordinateTop)
    .expect(tooltipCoordinateBottom)
    .gt(hostCoordinateBottom);
});

/**
 * Purpose: checks that tooltip can be controlled by using tab key
 * Test Attribute: focusable
 * Test Description: check for focusable property
 */
testCoreTooltip('focusable', '- check for focusable property', async (t, ctx) => {
  const tooltipHost = ctx.target;

  await t
    .wait(2000)
    .expect(tooltipHost.getStyleProperty('opacity'))
    .eql('0')
    .pressKey('tab')
    .expect(tooltipHost.getStyleProperty('opacity'))
    .eql('1');
});

/**
 * Purpose: checks that there is no arrow at the bottom of the tooltip
 * Test Attribute: noArrow
 * Test Description: check for no-visible-arrow property
 */
testCoreTooltip('noArrow', '- check for no-visible-arrow property', async (t, ctx) => {
  const tooltipHost = Selector('#no-arrow');
  const tooltipBox = ShadowChildSelector(t, { targetQuerySelector: '#no-arrow' }, '#tooltip-back');

  await t
    .hover(tooltipHost)
    .expect(tooltipHost.hasAttribute('no-visible-arrow')).ok()
    // min-height and min-width depends on --arrow-size which affects border-width,
    // no other way to get around this
    .expect(tooltipBox.getStyleProperty('min-height'))
    .eql('0px')
    .expect(tooltipBox.getStyleProperty('min-width'))
    .eql('0px');
});
