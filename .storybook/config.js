import { configure } from '@storybook/html';
import CoreSliderElement from '../src/core-slider/CoreSliderElement';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// Register custom components.
// component('core-slider', CoreSliderElement);
configure(loadStories, module);
