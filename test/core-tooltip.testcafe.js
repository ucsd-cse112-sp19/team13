/* eslint-disable no-unused-vars */
import { ClientFunction } from 'testcafe';
import { TestCoreElement, ShadowChildSelector } from './testcore';

/* eslint-disable */
fixture `core-tooltip tests`
    .page `./core-tooltip-index.html`;
/* eslint-enable */
/* eslint-disable no-unused-vars */

function testCoreTooltip(sectionName, testDesc, testFunc) {
  TestCoreElement('core-tooltip', sectionName, testDesc, testFunc);
}

/**
 * Purpose: calls and returns the value of get strAttrName of the tooltip with id strElemId
 *
 * @param {String} strAttrName the name of the attribute to get
 * @param {String} strElemId the id of the tested element.
 */
const getCoreAttribute = ClientFunction((strAttrName, strElemId) => {
  const testElement = document.getElementById(strElemId);
  const getExpression = 'testElement.' + strAttrName;
  return eval(getExpression);
});

/**
 * Purpose: calls set strAttrName of the tooltip with id strElemId
 * Note: the return value is an empty string and has no meaning
 *
 * @param {String} strAttrName the name of the attribute to get
 * @param {String} strElemId the id of the tested element.
 * @param value the value strAttrName should be set to. For strings,they need to be in format '"example string"'
 */
const setCoreAttribute = ClientFunction((strAttrName, strElemId, value) => {
  const testElement = document.getElementById(strElemId);
  // set the strAttrName to value
  const setExpression = 'testElement.' + strAttrName + ' = ' + value;
  eval(setExpression);
  return '';
});

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

/** Tests for light theme of core-tooltip */
testCoreTooltip('effect', '- light effect', async (t, ctx) => {
  const tooltip = ctx.target;
  const tooltipBox = ShadowChildSelector(t, ctx, '#tooltip-back');
  await t
    .hover(tooltip)
    .expect(tooltipBox.getStyleProperty('background'))
    .eql('lightgray');
});

/** Tests for dark theme of core-tooltip */
testCoreTooltip('effect', '- dark effect', async (t, ctx) => {
  const tooltip = ctx.target;
  const tooltipBox = ShadowChildSelector(t, ctx, '#tooltip-back');
  await t
    .hover(tooltip)
    .expect(tooltipBox.getStyleProperty('background'))
    .eql('darkgray');
});

/** Tests for hoverable property of Core-tooltip */
testCoreTooltip('hoverable', '- check the component is hoverable', async (t, ctx) => {
  const tooltip = ctx.target;
  const tooltipBox = ShadowChildSelector(t, ctx, '#tooltip-child-name-temp');
  await t
    .hover(tooltip)
    .expect(tooltipBox.getAttribute('opacity'))
    .eql('1');
});

/** Test for placement */
testCoreTooltip('placement', '- placement location', async (t, ctx) => {
  const tooltip = ctx.target;
});
