import { storiesOf } from '@storybook/html';
// import { withKnobs } from '@storybook/addon-knobs/polymer';
// import { action } from '@storybook/addon-actions';
import coreslider from '../src/core-slider/CoreSliderElement';
// import '../src/core-slider/CoreSliderElement.html';
// import '../src/core-slider/CoreSliderElement.css';

storiesOf('Core Slider', module)
  .add('English', () => '<core-slider>Peter</core-slider>')
  // .addDecorator(withKnobs)
  .add('Default', () => {
    const slider = document.createElement('core-slider');
    slider.type = 'core-slider';
    return slider;
  })
  .add('slider2', () => {
    const coreHello3 = document.createElement('core-slider');
    return coreHello3;
  })
  .add('as a component', () => ({
    components: { coreslider },
    template: '<core-slider></core-slider>',
  }));
