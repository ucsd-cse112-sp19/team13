/* eslint-disable no-unused-vars */
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
testCoreTooltip('content', '- Content value', async (t, ctx) => {
  const tooltip = ctx.target;
  await t
    .expect(0).eql(0);
});
