/* eslint-disable no-unused-vars */
import { ClientFunction, Selector } from 'testcafe';
import { TestCoreElement, ShadowChildSelector, ShadowRootSelector } from './testcore';

/* eslint-disable */
fixture `core-link tests`
    .page `./core-link-index.html`;
/* eslint-enable */
/* eslint-disable no-unused-vars */

function testCoreLink(sectionName, testDesc, testFunc) {
  TestCoreElement('core-link', sectionName, testDesc, testFunc);
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
 * Purpose: checks that the set value of disabled true
 * Test Attribute: disabled
 * Test Description: Set disabled value should be true
 */
testCoreLink('disabled', '- Set disabled value should be true', async (t, ctx) => {
  const isDisabled = 'true';
  await setCoreAttribute('disabled', 'disabled-set', isDisabled);
  const setValue = await getCoreAttribute('disabled', 'disabled-set');
  await t
    .expect(setValue).eql(isDisabled);
});

/**
 * Purpose: checks that the core-link has an underline for the text-decoration
 * Test Attribute: underline
 * Test Description: underline test
 */
testCoreLink('underline', '- underline test', async (t, ctx) => {
  const link = Selector(() => document.querySelector('#underline-link'));
  const linkComp = ShadowChildSelector(t, ctx, '#link');

  await t
    .expect(link.hasAttribute('underline'))
    .ok()
    .expect(linkComp.getStyleProperty('text-decoration-line'))
    .eql('underline');
});

/**
 * Purpose: checks that the core-link href is working as intended
 * Test Attribute: underline
 * Test Description: underline test
 */
testCoreLink('href', '- underline test', async (t, ctx) => {
  const link = Selector(() => document.querySelector('#underline-link'));
  const linkComp = ShadowChildSelector(t, ctx, '#link');

  await t
    .expect(link.hasAttribute('href'))
    .ok()
    .expect(linkComp.getAttribute('href'))
    .contains('www.google.com');
});

/**
 * Purpose: checks that the set value of type is "primary"
 * Test Attribute: type
 * Test Description: Set type value should be "primary"
 */
testCoreLink('type', '- Set type value should be "primary"', async (t, ctx) => {
  const type = 'primary'; // string to set type
  await setCoreAttribute('type', 'type-primary', type);
  const setValue = await getCoreAttribute('type', 'type-primary');
  await t
    .expect(setValue).eql(type);
});

/**
 * Purpose: checks that the set value of type is "success"
 * Test Attribute: type
 * Test Description: Set type value should be "success"
 */
testCoreLink('type', '- Set type value should be "success"', async (t, ctx) => {
  const type = 'success'; // string to set type
  await setCoreAttribute('type', 'type-success', type);
  const setValue = await getCoreAttribute('type', 'type-success');
  await t
    .expect(setValue).eql(type);
});

/**
 * Purpose: checks that the set value of type is "info"
 * Test Attribute: type
 * Test Description: Set type value should be "info"
 */
testCoreLink('type', '- Set type value should be "info"', async (t, ctx) => {
  const type = 'info'; // string to set type
  await setCoreAttribute('type', 'type-info', type);
  const setValue = await getCoreAttribute('type', 'type-info');
  await t
    .expect(setValue).eql(type);
});
