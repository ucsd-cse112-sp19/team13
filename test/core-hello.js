const { assert } = require('chai');
const showroom = require('showroom/puppeteer')();

const HELLO_STRING = {
  en: 'Hello World',
  es: 'Hola Mundo',
  jp: 'こんにちは世界',
  fr: 'Bonjour le monde',
};

// Helper function to get outer message
async function getOuterMessage(langString) {
  await showroom.setAttribute('lang', langString);
  const outerHello = await showroom.find('// span');
  const outerMessage = await showroom.getTextContent(outerHello);
  return outerMessage;
}


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
    const outerMessage = getOuterMessage('en');
    assert.equal(outerMessage, HELLO_STRING.en);
  });

  /**
   * This test check whether the message is in spanish
   */
  it(`Message should be ${HELLO_STRING.es}`, async () => {
    const outerMessage = getOuterMessage('es');
    assert.equal(outerMessage, HELLO_STRING.es);
  });

  /**
   * This test check whether the message is in japanese
   */
  it(`Message should be ${HELLO_STRING.jp}`, async () => {
    const outerMessage = getOuterMessage('jp');
    assert.equal(outerMessage, HELLO_STRING.jp);
  });

  /**
   * This test check whether the message is in france
   */
  it(`Message should be ${HELLO_STRING.fr}`, async () => {
    const outerMessage = getOuterMessage('fr');
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
