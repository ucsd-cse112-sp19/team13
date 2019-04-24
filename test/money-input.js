const { expect } = require('chai');
const showroom = require('showroom/test-utils')();

describe('money-input', async () => {
  before(async () => {
    await showroom.start();
  });

  after(async () => {
    await showroom.stop();
  });

  beforeEach(async() => {
    await showroom.utils.setTestSubject('money-input');
  })

  context('without changing anything', () => {
    it('should have USD as default attribute', async () => {
      const initialCurrency = showroom.utils.getAttribute('currency');
      expect(initialCurrency).to.equal('USD');
    
    });
  });

  // Example of checking attributes.
  context('with changing currency', () => {
    it('should change currency to CAD', async () => {
      showroom.utils.setAttribute('currency', 'CAD');
      const newCurrency = showroom.utils.getAttribute('currency');
      expect(newCurrency).to.equal('CAD');   
    });
  });

  // Example of checking properties.
  context('with disabling', () => {
    it('should create the disabled property', async () => {
      showroom.utils.setProperty('disabled', 'disabled');
      const disabled = showroom.utils.getProperty('disabled');
      expect(disabled).to.equal('disabled');
    });
  });
});
