import { TestCoreElement, ShadowChildSelector } from './testcore';

/* eslint-disable */
fixture `core-slider tests`
    .page `./core-slider-index.html`;
/* eslint-enable */

function testCoreSlider(sectionName, testDesc, testFunc) {
  TestCoreElement('core-slider', sectionName, testDesc, testFunc);
}

/** Tests for default value of core-slider */
testCoreSlider('default', '- Default value', async (t, ctx) => {
  const slider = ctx.target;
  await t
    .expect(slider.value)
    .eql(0);
});

/** Tests default min for core-slider */
testCoreSlider('default', '- Default min', async (t, ctx) => {
  const slider = ctx.target;
  const sliderThumb = ShadowChildSelector(t, ctx, '#slider-thumb');
  await t
    .drag(sliderThumb, -1000, 100)
    .expect(slider.value)
    .eql(0);
});

/** Tests default max for core-slider */
testCoreSlider('default', '- Default max', async (t, ctx) => {
  const slider = ctx.target;
  const sliderThumb = ShadowChildSelector(t, ctx, '#slider-thumb');
  await t
    .drag(sliderThumb, 1000, 100)
    .expect(slider.value)
    .eql(100);
});

/** Tests for initialized value of core-slider */
testCoreSlider('init', '- Set value attribute', async (t, ctx) => {
  const slider = ctx.target;
  await t
    .expect(slider.value)
    .eql(50);
});

/** Tests dragging and updating value for core-slider */
testCoreSlider('default', '- Dragging and updating to value', async (t, ctx) => {
  const slider = ctx.target;
  const sliderThumb = ShadowChildSelector(t, ctx, '#slider-thumb');
  const dstSliderThumb = ShadowChildSelector(t, { targetQuerySelector: '#value10' }, '#slider-thumb');
  await t
    .dragToElement(sliderThumb, dstSliderThumb)
    .dragToElement(sliderThumb, dstSliderThumb)
    .dragToElement(sliderThumb, dstSliderThumb)
    .expect(slider.value)
    .eql(10);
});

/** Tests dragging with step for core-slider */
testCoreSlider('step', '', async (t, ctx) => {
  const slider = ctx.target;
  const sliderThumb = ShadowChildSelector(t, ctx, '#slider-thumb');
  const dstSliderThumb = ShadowChildSelector(t, { targetQuerySelector: '#value50' }, '#slider-thumb');
  await t
    .dragToElement(sliderThumb, dstSliderThumb)
    .expect(slider.value)
    .eql(30);
});

/** Tests min for core-slider */
testCoreSlider('min', '', async (t, ctx) => {
  const slider = ctx.target;
  const sliderThumb = ShadowChildSelector(t, ctx, '#slider-thumb');
  await t
    .drag(sliderThumb, -1000, 100)
    .expect(slider.value)
    .eql(10);
});

/** Tests max for core-slider */
testCoreSlider('max', '', async (t, ctx) => {
  const slider = ctx.target;
  const sliderThumb = ShadowChildSelector(t, ctx, '#slider-thumb');
  await t
    .drag(sliderThumb, 1000, 100)
    .expect(slider.value)
    .eql(20);
});

/** Tests disabled for core-slider */
testCoreSlider('init', '- Make sure it can do it.', async (t, ctx) => {
  const slider = ctx.target;
  const dstSliderThumb = ShadowChildSelector(t, { targetQuerySelector: '#value0' }, '#slider-thumb');
  await t
    .dragToElement(slider, dstSliderThumb)
    .expect(slider.value)
    .notEql(50);
});
testCoreSlider('disabled', '- Make sure it can\'t.', async (t, ctx) => {
  const slider = ctx.target;
  const dstSliderThumb = ShadowChildSelector(t, { targetQuerySelector: '#value0' }, '#slider-thumb');
  await t
    .dragToElement(slider, dstSliderThumb)
    .expect(slider.value)
    .eql(50);
});
