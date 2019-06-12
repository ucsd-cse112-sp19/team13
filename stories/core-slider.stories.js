import { storiesOf } from '@storybook/html';
// import { withKnobs } from '@storybook/addon-knobs/polymer';
// import { action } from '@storybook/addon-actions';
import coreslider from '../src/core-slider/CoreSliderElement.js';
// import '../src/core-slider/CoreSliderElement.html';
// import '../src/core-slider/CoreSliderElement.css';

storiesOf('Core Slider', module)
  .add('English', () => '<core-slider>Peter</core-slider>')
  // .addDecorator(withKnobs)
  .add('Default', () => {
    const slider = document.createElement('core-slider');
    slider.innerText = 'demo';
    return slider;
  })
  .add('as a component', () => ({
    components: { coreslider },
    template: '<core-slider></core-slider>',
  }));
