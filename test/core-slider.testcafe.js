import { TestCoreElement, ShadowChildSelector } from './testcore';

/* eslint-disable */
fixture `core-slider tests`
    .page `./core-slider-index.html`;
/* eslint-enable */

function testCoreSlider(sectionName, testDesc, testFunc) {
  TestCoreElement('core-slider', sectionName, testDesc, testFunc);
}

/**
* Purpose: checks default value of attribute value is 0
* Test Attribute: value
* Test Description: Default value
*/
testCoreSlider('default', '- Default value', async (t, ctx) => {
  const slider = ctx.target;
  await t
    .expect(slider.value)
    .eql(0);
});

/**
* Purpose: checks default min value for core-slider is 0
* Test Attribute: min
* Test Description: Default min
*/
testCoreSlider('default', '- Default min', async (t, ctx) => {
  const slider = ctx.target;
  const sliderThumb = ShadowChildSelector(t, ctx, '#slider-thumb');
  await t
    .drag(sliderThumb, -1000, 100)
    .expect(slider.value)
    .eql(0);
});

/**
* Purpose: checks default max value for core-slider is 100
* Test Attribute: max
* Test Description: Default max
*/
testCoreSlider('default', '- Default max', async (t, ctx) => {
  const slider = ctx.target;
  const sliderThumb = ShadowChildSelector(t, ctx, '#slider-thumb');
  await t
    .drag(sliderThumb, 1000, 100)
    .expect(slider.value)
    .eql(100);
});

/**
* Purpose: checks that the initialized value for attribute value is 50
* Test Attribute: value
* Test Description: Set value attribute
*/
testCoreSlider('init', '- Set value attribute', async (t, ctx) => {
  const slider = ctx.target;
  await t
    .expect(slider.value)
    .eql(50);
});

/**
* Purpose: checks that dragging core-slider updates the value to 20
* Test Attribute: value
* Test Description: Dragging and updating to value
*/
testCoreSlider('default', '- Dragging and updating to value', async (t, ctx) => {
  const slider = ctx.target;
  const sliderThumb = ShadowChildSelector(t, ctx, '#slider-thumb');
  const dstSliderThumb = ShadowChildSelector(t, { targetQuerySelector: '#value20' }, '#slider-thumb');
  await t
    .dragToElement(sliderThumb, dstSliderThumb)
    .dragToElement(sliderThumb, dstSliderThumb)
    .dragToElement(sliderThumb, dstSliderThumb)
    .expect(slider.value)
    .eql(20);
});

/**
* Purpose: checks that the step attribute only allows certain values for value
* Test Attribute: step
* Test Description: value after trying to drag slider to 50 should be 30
*/
testCoreSlider('step', 'value after trying to drag slider to 50 should be 30', async (t, ctx) => {
  const slider = ctx.target;
  const sliderThumb = ShadowChildSelector(t, ctx, '#slider-thumb');
  const dstSliderThumb = ShadowChildSelector(t, { targetQuerySelector: '#value50' }, '#slider-thumb');
  await t
    .dragToElement(sliderThumb, dstSliderThumb)
    .expect(slider.value)
    .eql(30);
});

/**
* Purpose: checks that the initialized min value for core-slider only allows values >= 100
* Test Attribute: min
* Test Description: value after trying to drag slider before min of 10 should be 10
*/
testCoreSlider('min', '- value after trying to drag slider before min of 10 should be 10', async (t, ctx) => {
  const slider = ctx.target;
  const sliderThumb = ShadowChildSelector(t, ctx, '#slider-thumb');
  await t
    .drag(sliderThumb, -1000, 100)
    .expect(slider.value)
    .eql(10);
});

/**
* Purpose: checks that the initialized max value for core-slider only allows values <= 100
* Test Attribute: max
* Test Description: value after trying to drag slider after max of 100 should be 100
*/
testCoreSlider('max', '- value after trying to drag slider after max of 100 should be 100', async (t, ctx) => {
  const slider = ctx.target;
  const sliderThumb = ShadowChildSelector(t, ctx, '#slider-thumb');
  await t
    .drag(sliderThumb, 1000, 100)
    .expect(slider.value)
    .eql(20);
});

/**
* Purpose: checks that without disabled attribute, the slider value can change
* Test Attribute: disabled
* Test Description: value after trying to drag slider should no longer be 50
*/
testCoreSlider('init', '- value after trying to drag slider should no longer be 50', async (t, ctx) => {
  const slider = ctx.target;
  const dstSliderThumb = ShadowChildSelector(t, { targetQuerySelector: '#value0' }, '#slider-thumb');
  await t
    .dragToElement(slider, dstSliderThumb)
    .expect(slider.value)
    .notEql(50);
});

/**
* Purpose: checks that with disabled attribute, the slider value can not change
* Test Attribute: disabled
* Test Description: value after trying to drag slider should still be 50
*/
testCoreSlider('disabled', '- value after trying to drag slider should still be 50', async (t, ctx) => {
  const slider = ctx.target;
  const dstSliderThumb = ShadowChildSelector(t, { targetQuerySelector: '#value0' }, '#slider-thumb');
  await t
    .dragToElement(slider, dstSliderThumb)
    .expect(slider.value)
    .eql(50);
});
