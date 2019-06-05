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
  const getExpression = `testElement.${strAttrName}`;
  return eval(getExpression);
});

/**
 * Purpose: calls set strAttrName of the tooltip with id strElemId
 * Note: the return value is an empty string and has no meaning
 *
 * @param {String} strAttrName the name of the attribute to get
 * @param {String} strElemId the id of the tested element.
 * @param value the value strAttrName should be set to. For strings,they need to
 * be in format '"example string"'
 */
const setCoreAttribute = ClientFunction((strAttrName, strElemId, value) => {
  const testElement = document.getElementById(strElemId);
  // set the strAttrName to value
  const setExpression = `testElement.${strAttrName} = ${value}`;
  eval(setExpression);
  return '';
});
/* eslint-enable */
/* eslint-disable no-unused-vars */

/** Unit Tests for content attribute of core-tooltip */
testCoreTooltip('content', '- Default content value should be empty string', async (t, ctx) => {
  const defaultValue = await getCoreAttribute('content', 'content-default');
  await t
    .expect(defaultValue).eql('');
});

testCoreTooltip('content', '- Set content value should be Team Friday Tooltip', async (t, ctx) => {
  const setMessage = '"Team Friday Tooltip"'; // message to set content
  const evalMessage = 'Team Friday Tooltip'; // message the set content should evaluate to
  await setCoreAttribute('content', 'content-set', setMessage);
  const setValue = await getCoreAttribute('content', 'content-set');
  await t
    .expect(setValue).eql(evalMessage);
});

/** Unit Tests for disable attribute of core-tooltip */
testCoreTooltip('disabled', '- Default disabled value should be false', async (t, ctx) => {
  const defaultValue = await getCoreAttribute('disabled', 'disabled-default');
  await t
    .expect(defaultValue).eql(false);
});

testCoreTooltip('disabled', '- Set disabled value should be true', async (t, ctx) => {
  const isDisabled = true;
  await setCoreAttribute('disabled', 'disabled-set', isDisabled);
  const setValue = await getCoreAttribute('disabled', 'disabled-set');
  await t
    .expect(setValue).eql(isDisabled);
});

/** Tests for dark theme of core-tooltip */
testCoreTooltip('effect', '- dark effect', async (t, ctx) => {
  const tooltip = Selector('#label-dark');
  // const tooltipBox =
  //    ShadowChildSelector(t, { targetQuerySelector: '#effect-dark' }, '#tooltip-back');
  const tooltipBox = Selector(() => document.querySelector('#effect-dark').shadowRoot.querySelector('#tooltip-back'));
  console.log(tooltipBox.getStyleProperty('display'));
  await t
    .hover(tooltip)
    .expect(tooltipBox.getStyleProperty('background'))
    .eql('var(--back-color)');
});

/** Tests for light theme of core-tooltip */
testCoreTooltip('effect', '- light effect', async (t, ctx) => {
  const tooltip = Selector('#label-light');
  const tooltipBox = ShadowChildSelector(t, { targetQuerySelector: '#effect-light' }, '#tooltip-back');
  await t
    .hover(tooltip)
    .expect(tooltipBox.getStyleProperty('background'))
    .eql('white');
});

/** Tests for hoverable property of Core-tooltip */
testCoreTooltip('hoverable', '- check the component is hoverable', async (t, ctx) => {
  const tooltip = Selector('#hoverable-tooltip');
  const tooltipBox = Selector('#hoverable-tooltip-box');
  await t
    .hover(tooltip)
    .expect(tooltipBox.getStyleProperty('opacity'))
    .eql('1');
});

/** Tests for enterable property of Core-tooltip (keep visiable when mouse enter tooltip */
testCoreTooltip('enterable', '- check the tootip is enterable', async (t, ctx) => {
  const tooltip = Selector('#enterable-tooltip');
  const tooltipBox = Selector('#enterable-tooltip-box');
  await t
    .hover(tooltip)
    /* TODO: moving mouse up a liitle to enter the tooltip.... not sure how to do it */
    .expect(tooltipBox.getStyleProperty('opacity'))
    .eql('1');

  await t
    .hover(tooltipBox)
    .expect(tooltipBox.getStyleProperty('opacity'))
    .eql('1');
});

/** Tests for hide after property of Core-tooltip */
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

/** Tests for popup after property of Core-tooltip */
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
    .wait(1000)
    .expect(tooltipBox1.getStyleProperty('opacity'))
    .eql('1');
});

/** Unit Tests for offset attribute of core-tooltip */
testCoreTooltip('offset', '- Default offset value should be 0', async (t, ctx) => {
  const defaultValue = await getCoreAttribute('offset', 'offset-default');
  await t
    .expect(defaultValue).eql(0);
});

testCoreTooltip('offset', '- Set offset value should be 1', async (t, ctx) => {
  const index = 1;
  await setCoreAttribute('offset', 'offset-set', index);
  const setValue = await getCoreAttribute('offset', 'offset-set');
  await t
    .expect(setValue).eql(index);
});

/** Test for placement: left */
testCoreTooltip('placement', '- placement location: left', async (t, ctx) => {
  const tooltipHost = ShadowRootSelector(t, ctx);
  const tooltipBox = ShadowChildSelector(t, { targetQuerySelector: '#left' }, '#tooltip-back');

  const hostCoordinate = tooltipHost.getBoundingClientRectProperty('left');
  const tooltipCoordinate = tooltipBox.getBoundingClientRectProperty('left');

  await t
    .expect(hostCoordinate)
    .eql(tooltipCoordinate);
});

/** Test for placement: right */

/** Test for placement: up */

/** Test for placement: down */

/** Unit Tests for tabindex attribute of core-tooltip */
testCoreTooltip('tabindex', '- Default tabindex value should be 0', async (t, ctx) => {
  const defaultValue = await getCoreAttribute('tabindex', 'tabindex-default');
  await t
    .expect(defaultValue).eql(0);
});

testCoreTooltip('tabindex', '- Set tabindex value should be 1', async (t, ctx) => {
  const index = 1;
  await setCoreAttribute('tabindex', 'tabindex-set', index);
  const setValue = await getCoreAttribute('tabindex', 'tabindex-set');
  await t
    .expect(setValue).eql(index);
});

/** Test for focusable property */
testCoreTooltip('focusable', '- check for focusable property', async (t, ctx) => {
  const isFocusable = ShadowRootSelector(t, ctx).hasAttribute('focusable');
  await t
    .expect(isFocusable)
    .eql(true);
});
