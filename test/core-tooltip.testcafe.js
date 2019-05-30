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

/** Tests for light theme of core-tooltip */
testCoreTooltip('effect', '- light effect', async (t, ctx) => {
  const tooltip = ctx.target;
  const tooltipBox = ShadowChildSelector(t, ctx, '#tooltip-child-name-temp');
  await t
    .hover(tooltip)
    .expect(tooltipBox.getStyleProperty('_________'))
    .eql('_____');
});

/** Tests for dark theme of core-tooltip */
testCoreTooltip('effect', '- dark effect', async (t, ctx) => {
  const tooltip = ctx.target;
  const tooltipBox = ShadowChildSelector(t, ctx, '#tooltip-child-name-temp');
  await t
    .hover(tooltip)
    .expect(tooltipBox.getStyleProperty('_________'))
    .eql('_____');
});
