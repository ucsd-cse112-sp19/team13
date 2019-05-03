const assert = require('chai').assert;
const showroom = require('showroom/puppeteer')();

const HELLO_STRING = {
  en: 'Hello World',
  es: 'Hola Mundo',
  jp: 'こんにちは世界',
  fr: 'Bonjour le monde',
};


describe('core-hello', () => {
  before( async () => {
    await showroom.start();
  });

  after( async () => {
    await showroom.stop();
  });

  beforeEach( async () => {
    await showroom.setTestSubject('core-hello');
  });

  it(`Message should be ${HELLO_STRING.en}`, async () => {
    await showroom.setAttribute('lang', 'en');
    const outerHello = await showroom.find('// span');
    const outerMessage = await showroom.getTextContent(outerHello);

    assert.equal(outerMessage, HELLO_STRING.en);
  });

  it(`Message should be ${HELLO_STRING.es}`, async () => {
    await showroom.setAttribute('lang', 'es');
    const outerHello = await showroom.find('// span');
    const outerMessage = await showroom.getTextContent(outerHello);

   assert.equal(outerMessage, HELLO_STRING.es);
  });

  it(`Message should be ${HELLO_STRING.jp}`, async () => {
    await showroom.setAttribute('lang', 'jp');
    const outerHello = await showroom.find('// span');
    const outerMessage = await showroom.getTextContent(outerHello);

    assert.equal(outerMessage, HELLO_STRING.jp);
  });

  it(`Message should be ${HELLO_STRING.fr}`, async () => {
    await showroom.setAttribute('lang', 'fr');
    const outerHello = await showroom.find('// span');
    const outerMessage = await showroom.getTextContent(outerHello);

    assert.equal(outerMessage, HELLO_STRING.fr);
  });

  it('Rainbow attribute should exist and working', async () => {
    await showroom.setAttribute('rainbow');
    const outerHello = await showroom.find('// span');
    const attrExist = await showroom.hasAttribute('rainbow');

    assert.equal(outerMessage, HELLO_STRING.en);
  });
});