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

/** Tests for hoverable property of Core-tooltip */
testCoreTooltip('hoverable', '- check the component is hoverable', async (t, ctx) => {
  const tooltip = ctx.target;
  const tooltipBox = ShadowChildSelector(t, { targetQuerySelector: '#hoverable-tooltip-box' }, '#tooltip-back');
  await t
    .hover(tooltip)
    .expect(tooltipBox.getStyleProperty('opacity'))
    .eql('1');
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

/** Tests for light theme of core-tooltip */
testCoreTooltip('effect', '- light effect', async (t, ctx) => {
  const tooltip = ctx.target;
  const tooltipBox = ShadowChildSelector(t, { targetQuerySelector: '#effect-light' }, '#tooltip-back');
  await t
    .hover(tooltip)
    .expect(tooltipBox.getStyleProperty('background'))
    .eql('lightgray');
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
