import { Selector } from 'testcafe';

// Slider component
const slider = Selector('#size-slider');
const disabledSlider = Selector('#disabled-slider');
const rainbowSlider = Selector('#target-slider-rainbow');

// Slider's thumb component
const sliderThumb = Selector(() => document.querySelector('#size-slider').shadowRoot.querySelector('#slider-thumb'));

const disabledThumb = Selector(() => document.querySelector('#disabled-slider').shadowRoot.querySelector('#slider-thumb'));

const targetThumbArb = Selector(() => document.querySelector('#target-slider-arbitrary').shadowRoot.querySelector('#slider-thumb'));

const targetThumbMax = Selector(() => document.querySelector('#target-slider-max').shadowRoot.querySelector('#slider-thumb'));

const targetThumbMin = Selector(() => document.querySelector('#target-slider-min').shadowRoot.querySelector('#slider-thumb'));

// fixture, getting the page for testing
fixture `Core Slider Test`
    .page `../dist/index.html`;

/**
 * Tests for default value of core-slider
 */
test('Default core-slider', async (t) => {
  await t
    .expect(slider.value).eql('60');
});

/**
 * Tests for initialized value of core-slider
 *
 * NOTE: This needs to be fixed
 */
test('Initialized core-slider', async (t) => {
  await t
    .expect(slider.value).eql('60');
});

/**
 * Tests for value Attribute of Core-Slider
 */
test('Dragging core-slider for value check', async (t) => {
  await t
    .dragToElement(sliderThumb, disabledThumb)
    .expect(slider.value).eql('50');
});

/**
 * Tests for steps Attribute of Core-Slider
 */
test('Dragging core-slider for steps check', async (t) => {
  await t
    .dragToElement(sliderThumb, targetThumbArb)
    .expect(slider.value).eql('30');
});

/**
 * Tests for min attribute of core-slider
 */
test('Min attribute', async (t) => {
  await t
    .dragToElement(sliderThumb, targetThumbMin)
    .expect(slider.value).eql('10');
});

/**
 * Tests for max attribute of core-slider
 */
test('Max attribute', async (t) => {
  await t
    .dragToElement(sliderThumb, targetThumbMax)
    .expect(slider.value).eql('100');
});

/**
 * Tests for disabled attribute of core-slider
 */
test('Disabled attribute', async (t) => {
  await t
    .dragToElement(disabledThumb, targetThumbArb)
    .expect(disabledSlider.value).eql('50');
});

/**
 * Tests for rainbow attribute existence of core-slider
 */
test('Rainbow attribute', async (t) => {
  await t
    .expect(rainbowSlider.hasAttribute('rainbow')).ok();
});
