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

/** Tests for content attribute of core-tooltip */
testCoreTooltip('content', '- Exists an attribute named content', async (t, ctx) => {
  const getExistence = ClientFunction(() => {
    const testElement = document.getElementById('content-exists');
    // if content is among tooltip's listed attributes, then return true
    if ((testElement.attributes).content) {
      return true;
    }
    return false;
  });
  const existsValue = await getExistence();
  await t
    .expect(existsValue).eql(true);
});

testCoreTooltip('content', '- Default content value should be empty string', async (t, ctx) => {
  const getContent = ClientFunction(() => {
    const testElement = document.getElementById('content-default');
    return testElement.content;
  });
  const contentValue = await getContent();
  await t
    .expect(contentValue).eql('');
});

testCoreTooltip('content', '- Set content value should be Team Friday Tooltip', async (t, ctx) => {
  const message = 'Team Friday Tooltip';
  const getContent = ClientFunction((strMsg) => {
    const testElement = document.getElementById('content-set');
    testElement.content = strMsg;
    return testElement.content;
  });
  const contentValue = await getContent(message);
  await t
    .expect(contentValue).eql(message);
});
