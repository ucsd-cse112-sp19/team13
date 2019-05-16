export default {
  component: 'core-slider',
  path: '../dist/core-slider.js',
  functions: {
    increaseStep: (step) => {
      let currVal = showroom.getAttribute('value');
      showroom.setAtttribute('value', currVal + step);
    }
  },
  outerHTML:`
    <core-slider></core-slider>
  `
}