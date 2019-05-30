import { Selector } from 'testcafe';

const SELECTOR_OPTS = {
  timeout: 300,
};

/**
 * A wrapper for the test function to simplify web component testing. This will
 * find any tag with passed-in element name that is a child of a section with the
 * passed-in id. In other words, the html page must follow a strict format of:
 *
 * @example
 * <section id="test-TAGNAME-SECTIONID">
 *  <TAGNAME></TAGNAME>
 *  <!-- Put anything you want here. Order does not matter. -->
 * </section>
 *
 * @param {String} elementName the tag name of the element being tested.
 * @param {String} sectionName the name of the section that contains the tested element.
 * @param {String} description the test description.
 * @param {Function} testFunc the actual test to be performed with the element.
 */
export function TestCoreElement(elementName, sectionName, description, testFunc) {
  test(`${elementName}:${sectionName} ${description}`, async (t) => {
    const sectionQuerySelector = `#test-${elementName}-${sectionName}`;
    const sectionSelector = Selector(sectionQuerySelector, SELECTOR_OPTS);
    const targetSelector = sectionSelector.find(`${elementName}`);

    await testFunc(t, {
      target: targetSelector,
      section: sectionSelector,
      targetQuerySelector: `${sectionQuerySelector} ${elementName}`,
    });
  });
}

const shadowRootSelector = Selector(
  rootQuerySelector => document.querySelector(rootQuerySelector).shadowRoot,
  SELECTOR_OPTS,
);
/** A selector for the current test section's target shadow root */
export function ShadowRootSelector(t, ctx) {
  return shadowRootSelector.with({ boundTestRun: t })(
    ctx.targetQuerySelector,
  );
}

const shadowChildSelector = Selector(
  (rootQuerySelector, childQuerySelector) => document.querySelector(rootQuerySelector)
    .shadowRoot.querySelector(childQuerySelector),
  SELECTOR_OPTS,
);
/** A selector for a child under the current test section's target shadow root */
export function ShadowChildSelector(t, ctx, childQuerySelector) {
  return shadowChildSelector.with({ boundTestRun: t })(
    ctx.targetQuerySelector,
    childQuerySelector,
  );
}
