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

/** Unit Tests for disabled attribute of core-link */
/**
 * Purpose: checks that the default value of disable is false
 *
 * @param {String} sectionName the name of the attribute being tested
 * @param {String} testDesc further description of the test
 * @param {function} testFunc the function to test the attribute
 */
testCoreLink('disabled', '- Default disabled value should be false', async (t, ctx) => {
  const defaultValue = await getCoreAttribute('disabled', 'disabled-default');
  await t
    .expect(defaultValue).eql(false);
});

/**
 * Purpose: checks that the set value of disabled true
 *
 * @param {String} sectionName the name of the attribute being tested
 * @param {String} testDesc further description of the test
 * @param {function} testFunc the function to test the attribute
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
 *
 * @param {String} sectionName the name of the attribute being tested
 * @param {String} testDesc further description of the test
 * @param {function} testFunc the function to test the attribute
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
 *
 * @param {String} sectionName the name of the attribute being tested
 * @param {String} testDesc further description of the test
 * @param {function} testFunc the function to test the attribute
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

/** Unit Tests for icon attribute of core-link */
/**
 * Purpose: checks that the default value of icon is empty string
 *
 * @param {String} sectionName the name of the attribute being tested
 * @param {String} testDesc further description of the test
 * @param {function} testFunc the function to test the attribute
 */
testCoreLink('icon', '- Default icon value should be empty string', async (t, ctx) => {
  const defaultValue = await getCoreAttribute('icon', 'icon-default');
  await t
    .expect(defaultValue).eql('');
});

/**
 * Purpose: checks that the set value of icon is "el-icon-edit"
 *
 * @param {String} sectionName the name of the attribute being tested
 * @param {String} testDesc further description of the test
 * @param {function} testFunc the function to test the attribute
 */
testCoreLink('icon', '- Set icon value should be "el-icon-edit"', async (t, ctx) => {
  const icon = "el-icon-edit"; // string to set icon
  await setCoreAttribute('icon', 'icon-set', icon);
  const setValue = await getCoreAttribute('icon', 'icon-set');
  await t
    .expect(setValue).eql(icon);
});

/** Unit Tests for type attribute of core-link */
/**
 * Purpose: checks that the default value of type is empty string
 *
 * @param {String} sectionName the name of the attribute being tested
 * @param {String} testDesc further description of the test
 * @param {function} testFunc the function to test the attribute
 */
testCoreLink('type', '- Default type value should be empty string', async (t, ctx) => {
  const defaultValue = await getCoreAttribute('type', 'type-default');
  await t
    .expect(defaultValue).eql('');
});

/**
 * Purpose: checks that the set value of type is "primary"
 *
 * @param {String} sectionName the name of the attribute being tested
 * @param {String} testDesc further description of the test
 * @param {function} testFunc the function to test the attribute
 */
testCoreLink('type', '- Set type value should be "primary"', async (t, ctx) => {
  const type = 'primary'; // string to set type
  await setCoreAttribute('type', 'type-set', type);
  const setValue = await getCoreAttribute('type', 'type-set');
  await t
    .expect(setValue).eql(type);
});
