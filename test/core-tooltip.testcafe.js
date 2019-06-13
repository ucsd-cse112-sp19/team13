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
 * Purpose: checks that the default value of content is the empty string
 * Test Attribute: content
 * Test Description: Default content value should be empty string
 */
testCoreTooltip('content', '- Default content value should be empty string', async (t, ctx) => {
  const contentAttr = await Selector('#content-default').hasAttribute('content');
  const tooltipHostText = Selector('#content-default').textContent;
  const tooltipText = await ShadowChildSelector(t, { targetQuerySelector: '#content-default' }, '#tooltip-content').textContent;

  await t
    .expect(contentAttr).eql(false)
    .expect(tooltipHostText).eql('')
    .expect(tooltipText)
    .eql('');
});

/**
 * Purpose: checks that the set value of content is 'Team Friday Tooltip'
 * Test Attribute: content
 * Test Description: Set content value should be Team Friday Tooltip
 */
testCoreTooltip('content', '- Set content value should be Team Friday Tooltip', async (t, ctx) => {
  const message = 'Team Friday Tooltip'; // message the set content should evaluate to
  await setCoreAttribute('content', 'content-set', message);
  const setValue = await getCoreAttribute('content', 'content-set');
  await t
    .expect(setValue).eql(message);
});

/**
 * Purpose: checks that the default value of disabled is false
 * Test Attribute: disabled
 * Test Description: Default disabled value should be false
 */
testCoreTooltip('disabled', '- Default disabled should not exist', async (t, ctx) => {
  const disabledAttr = await Selector('#disabled-default').hasAttribute('disabled');
  await t
    .expect(disabledAttr).eql(false);
});

/**
 * Purpose: checks that the set value of disabled true
 * Test Attribute: disabled
 * Test Description: Set disabled value should be true
 */
testCoreTooltip('disabled', '- Set disabled value should be true', async (t, ctx) => {
  const isDisabled = 'true';
  await setCoreAttribute('disabled', 'disabled-set', isDisabled);
  const setValue = await getCoreAttribute('disabled', 'disabled-set');
  await t
    .expect(setValue).eql(isDisabled);
});

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
  const target1 = Selector('#closedelay-target1');
  const tooltip2 = Selector('#closedelay-tooltip2');
  const target2 = Selector('#closedelay-target2');
  const tooltipBox1 = Selector('#closedelay-tooltip1-box');

  await t
    .hover(tooltip1)
    .expect(tooltipBox1.getStyleProperty('opacity'))
    .eql('1');

  // move to tooltip 2, tooltip 1 should stil appear
  await t
    .hover(target1)
    .expect(tooltipBox1.getStyleProperty('opacity'))
    .eql('1');

  // after 2 sec, tooltip 1 should be hide
  await t
    .wait(2000)
    .expect(tooltipBox1.getStyleProperty('opacity'))
    .eql('0');
});

/**
 * Purpose: checks that the tooltip only appears after a certain amount of time has passed
 * Test Attribute: opendelay
 * Test Description: check if the tooltip pops up after a few seconds
 */
testCoreTooltip('opendelay', '- check if the tooltip pops up after a few seconds', async (t, ctx) => {
  const tooltip1 = Selector('#opendelay-tooltip1');
  const tooltipBox1 = Selector('#opendelay-tooltip1-box');

  // should not pop up yet
  await t
    .hover(tooltip1)
    .expect(tooltipBox1.getStyleProperty('opacity'))
    .eql('0');

  // after 3 sec, tooltip 1 should  pop up
  await t
    .wait(3000)
    .expect(tooltipBox1.getStyleProperty('opacity'))
    .eql('1');
});

/**
 * Purpose: checks that the default value of offset attribute is 0
 * Test Attribute: offset
 * Test Description: Default offset value should be 0
 */
testCoreTooltip('offset', '- Default offset value should be 0', async (t, ctx) => {
  // const defaultValue = await getCoreAttribute('offset', 'offset-default');
  // await t
  //   .expect(defaultValue).eql(0);

  const tooltipBox = await ShadowChildSelector(t, { targetQuerySelector: '#offset-default' }, '#tooltip-back');
  const tooltipBoxSrc = await ShadowChildSelector(t, { targetQuerySelector: '#offset-correct' }, '#tooltip-back');


  const tooltipCoordinateTop = await tooltipBox.getBoundingClientRectProperty('top');
  const tooltipCoordinateTopCorrect = await tooltipBoxSrc.getBoundingClientRectProperty('top');

  await t
    .expect(tooltipCoordinateTop).eql(tooltipCoordinateTopCorrect);
});

/**
 * Purpose: checks that the set value of offset attribute is 1
 * Test Attribute: offset
 * Test Description: Set offset value should be 1
 */
testCoreTooltip('offset', '- Set offset value should be 1', async (t, ctx) => {
  const index = '1';
  await setCoreAttribute('offset', 'offset-set', index);
  const setValue = await getCoreAttribute('offset', 'offset-set');

  const tooltipBox = await ShadowChildSelector(t, { targetQuerySelector: '#offset-set' }, '#tooltip-back');
  const tooltipBoxSrc = await ShadowChildSelector(t, { targetQuerySelector: '#offset-correct' }, '#tooltip-back');


  const tooltipCoordinateTop = await tooltipBox.getBoundingClientRectProperty('top');
  const tooltipCoordinateTopCorrect = await tooltipBoxSrc.getBoundingClientRectProperty('top');

  await t
    .expect(setValue).eql(index)
    .expect(tooltipCoordinateTopCorrect - tooltipCoordinateTop).eql(1);
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
 * Purpose: checks that the tooltip can only be controlled manually and not by mouse
 * Test Attribute: manual
 * Test Description: manual property
 */
testCoreTooltip('manual', '- manual property', async (t, ctx) => {
  const tooltipHost = ctx.target;
  const target = Selector('#label-manual');
  await t
    .expect(tooltipHost.getStyleProperty('opacity'))
    .eql('0')
    .hover(target)
    .expect(tooltipHost.getStyleProperty('opacity'))
    .eql('0')
    .click(target)
    .expect(tooltipHost.getStyleProperty('opacity'))
    .eql('1');
});

/**
 * Purpose: checks that the set value of tabindex is 1
 * Test Attribute: tabindex
 * Test Description: Set tabindex value should be 1
 */
testCoreTooltip('tabindex', '- Set tabindex value should be 1', async (t, ctx) => {
  const index = '1';
  await setCoreAttribute('tabindex', 'tabindex-set', index);
  const setValue = await getCoreAttribute('tabindex', 'tabindex-set');
  await t
    .expect(setValue).eql(index);
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
