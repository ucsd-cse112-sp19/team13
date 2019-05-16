import { Selector } from 'testcafe';

const slider = Selector('#size-slider');
const sliderThumb = Selector(() => document.querySelector('#size-slider').shadowRoot.querySelector('#slider-thumb'))

fixture `Core Slider Test`
    .page `../dist/index.html`;

/** 
 * Tests for value Attribute of Core-Slider
 */
test('Dragging core-slider', async t => {
    await t
        .setTestSpeed(0.5)
        .click(sliderThumb)
        .expect(slider.value).eql('50')
        .drag(sliderThumb, 30, 0)
        .expect(slider.value).eql('70');
});