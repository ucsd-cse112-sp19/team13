/* eslint-disable no-unused-vars */
import { ClientFunction } from 'testcafe';
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

/** Tests for content attribute of core-tooltip */
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

/** Tests for disable attribute of core-tooltip */
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
  const tooltip = ctx.target;
  const tooltipBox = ShadowChildSelector(t, { targetQuerySelector: '#effect-dark' }, '#tooltip-back');
  await t
    .hover(tooltip)
    .expect(tooltipBox.getStyleProperty('background'))
    .eql('darkgray');
});

/** Tests for light theme of core-tooltip */
testCoreTooltip('effect', '- light effect', async (t, ctx) => {
  const tooltip = ctx.target;
  const tooltipBox = ShadowChildSelector(t, { targetQuerySelector: '#effect-light' }, '#tooltip-back');
  await t
    .hover(tooltip)
    .expect(tooltipBox.getStyleProperty('background'))
    .eql('lightgray');
});

/** Tests for enterable property of Core-tooltip (keep visiable when mouse enter tooltip */
testCoreTooltip('enterable', '- check the tootip is enterable', async (t, ctx) => {
  const tooltip = ctx.target;
  const tooltipBox = ShadowChildSelector(t, { targetQuerySelector: '#enterable-tooltip-box' }, '#tooltip-back');
  await t
    .hover(tooltip)
    /* TODO: moving mouse up a liitle to enter the tooltip.... not sure how to do it */
    .expect(tooltipBox.getStyleProperty('opacity'))
    .eql('1');
});

/** Tests for hoverable property of Core-tooltip */
testCoreTooltip('hideafter', '- check the previous tooltip hide after hover for new tooltip', async (t, ctx) => {
  const tooltip1 = document.getElementById('#hideafter-tooltip1');
  const tooltip2 = document.getElementById('#hideafter-tooltip2');
  const tooltipBox1 = document.getElementById('#hideafter-tooltip1-box');
  const tooltipBox2 = document.getElementById('#hideafter-tooltip2-box');
  await t
    .hover(tooltip1)
    .expect(tooltipBox1.getStyleProperty('opacity'))
    .eql('1');

  await t
    .hover(tooltip2)
    .expect(tooltipBox1.getStyleProperty('opacity'))
    .eql('0');
});

/** Tests for hoverable property of Core-tooltip */
testCoreTooltip('hoverable', '- check the component is hoverable', async (t, ctx) => {
  const tooltip = ctx.target;
  const tooltipBox = ShadowChildSelector(t, { targetQuerySelector: '#hoverable-tooltip-box' }, '#tooltip-back');
  await t
    .hover(tooltip)
    .expect(tooltipBox.getStyleProperty('opacity'))
    .eql('1');
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

/** Tests for tabindex attribute of core-tooltip */
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
