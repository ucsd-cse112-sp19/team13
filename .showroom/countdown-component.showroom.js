// https://github.com/eavichay/showroom-demo

export default {
  component: 'countdown-component',
  path: '../showroom_example/countdown-component.js',
  events: ['onstart', 'ontimeout', 'ontick', 'onstop'],
  attributes: {
    time: '1500'
  },
  functions: {
    start: () => {
      dashboard.targetComponent.start();
    },
    stop: () => {
      dashboard.targetComponent.stop();
    },
    resume: () => {
      dashboard.targetComponent.resume();
    }
  }
}
