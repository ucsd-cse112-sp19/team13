const { assert } = require('chai');
const showroom = require('showroom/puppeteer')();

const HELLO_STRING = {
  en: 'Hello World',
  es: 'Hola Mundo',
  jp: 'こんにちは世界',
  fr: 'Bonjour le monde',
};

/**
 * Main testing method using mocha
 */

describe('core-hello', () => {
  /**
   * Starting showroom and puppeter in order to create the html document
   * to be tested
   */
  before(async () => {
    await showroom.start();
  });

  /**
   * Stopping showroom and puppeter
   */
  after(async () => {
    await showroom.stop();
  });


  /**
   * Creating new core-hello component for each test cases wihtout any attribute
   */
  beforeEach(async () => {
    await showroom.setTestSubject('core-hello');
  });


  /**
   * This test check whether the message is in english
   */
  it(`Message should be ${HELLO_STRING.en}`, async () => {
    await showroom.setAttribute('lang', 'en');
    const outerHello = await showroom.find('// span');
    const outerMessage = await showroom.getTextContent(outerHello);

    assert.equal(outerMessage, HELLO_STRING.en);
  });

  /**
   * This test check whether the message is in spanish
   */
  it(`Message should be ${HELLO_STRING.es}`, async () => {
    await showroom.setAttribute('lang', 'es');
    const outerHello = await showroom.find('// span');
    const outerMessage = await showroom.getTextContent(outerHello);

    assert.equal(outerMessage, HELLO_STRING.es);
  });

  /**
   * This test check whether the message is in japanese
   */
  it(`Message should be ${HELLO_STRING.jp}`, async () => {
    await showroom.setAttribute('lang', 'jp');
    const outerHello = await showroom.find('// span');
    const outerMessage = await showroom.getTextContent(outerHello);

    assert.equal(outerMessage, HELLO_STRING.jp);
  });

  /**
   * This test check whether the message is in france
   */
  it(`Message should be ${HELLO_STRING.fr}`, async () => {
    await showroom.setAttribute('lang', 'fr');
    const outerHello = await showroom.find('// span');
    const outerMessage = await showroom.getTextContent(outerHello);

    assert.equal(outerMessage, HELLO_STRING.fr);
  });

  /**
   * This test check whether the rainbow component exist or not
   */
  it('Rainbow attribute should exist and working', async () => {
    await showroom.setAttribute('rainbow');
    const attrExist = await showroom.hasAttribute('rainbow');

    assert.equal(attrExist, true);
  });
});
