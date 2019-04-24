// Borrowed from:
// https://github.com/eavichay/showroom/blob/master/example/.showroom/showroom.money-input.js

export default {
  component: 'money-input',
  alias: 'Extending Native Elements',
  section: 'Examples',
  path: '/showroom_example/money-input.js',
  events: ['change'],

  // customized element
  extends: 'input',
  attributes: {
    currency: 'USD'
  },
  properties: {
    disabled: false
  },
  functions: {
    clear: () => {
      showroom.component.clear()
    }
  }
}