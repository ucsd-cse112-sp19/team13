export default {
  component: 'core-slider',
  path: '../dist/core-slider.js',
<<<<<<< HEAD
  functions: {
    increaseStep: (step) => {
      let currVal = showroom.getAttribute('value');
      showroom.setAtttribute('value', currVal + step);
    }
  },
=======
>>>>>>> 91cd0325deff9897d14f6c737c70d034bd67040c
  outerHTML:`
    <core-slider></core-slider>
  `
}