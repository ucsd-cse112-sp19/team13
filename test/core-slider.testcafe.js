import { Selector } from 'testcafe';

// Slider component
const slider = Selector(() => document.querySelector('#size-slider'));

const disabledSlider = Selector('.display-group').find('#disabled-slider');
const rainbowSlider = Selector('.display-group').find('#target-slider-rainbow');

const vertSlider = Selector('.display-group').find('#vert1');

// Slider's thumb component
const sliderThumb = Selector(() => document.querySelector('#default-group').querySelector('#size-slider').shadowRoot.querySelector('#slider').querySelector('#slider-thumb'));

const disabledThumb = Selector(() => document.querySelector('#default-group').querySelector('#disabled-slider').shadowRoot.querySelector('#slider').querySelector('#slider-thumb'));

const targetThumbArb = Selector(() => document.querySelector('#default-group').querySelector('#target-slider-arbitrary').shadowRoot.querySelector('#slider').querySelector('#slider-thumb'));

const targetThumbMax = Selector(() => document.querySelector('#default-group').querySelector('#target-slider-max').shadowRoot.querySelector('#slider').querySelector('#slider-thumb'));

const targetThumbMin = Selector(() => document.querySelector('#default-group').querySelector('#target-slider-min').shadowRoot.querySelector('#slider').querySelector('#slider-thumb'));

const vertThumb = Selector(() => document.querySelector('#vertical-group').querySelector('#vert1').shadowRoot.querySelector('#slider').querySelector('#slider-thumb'));

const targetVertThumb = Selector(() => document.querySelector('#vertical-group').querySelector('#vert3').shadowRoot.querySelector('#slider').querySelector('#slider-thumb'));

/* eslint-disable */

// fixture, getting the page for testing
fixture `Core Slider Test`
    .page `./test.html`;


/* eslint-enable */

/**
 * Tests for default value of core-slider
 */
test('Default core-slider', async (t) => {
  await t
    .expect(slider.value).eql('0');
});

/**
 * Tests for initialized value of core-slider
 *
 * NOTE: This needs to be fixed
 */
test('Initialized core-slider', async (t) => {
  await t
    .expect(disabledSlider.value).eql('50');
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
    .expect(slider.value).eql('25');
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
 * Tests for vertical slider
 */
test('Vertical slider functionality', async (t) => {
  await t
    .dragToElement(vertThumb, targetVertThumb)
    .expect(vertSlider.value).eql('50');
});

/**
 * Tests for rainbow attribute existence of core-slider
 */
test('Rainbow attribute', async (t) => {
  await t
    .expect(rainbowSlider.hasAttribute('rainbow')).ok();
});
