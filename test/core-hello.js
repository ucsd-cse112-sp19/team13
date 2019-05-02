const chai = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document } = (new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)).window;

// view result.html for more context
describe('core-hello element', () => {
  // set up test environment to have only one empty testElement in testArea
  beforeEach('init testing environment', () => {
    /*const HELLO_STRING = {
      en: 'Hello World',
      es: 'Hola Mundo',
      jp: 'こんにちは世界',
      fr: 'Bonjour le monde',
    };*/

    // Setting core-hello for DOM testting (test 1)
    // Setting core-hello for content testing (Test 2)
    const contentTest = document.createElement('core-hello');
    contentTest.setAttribute('id', 'contentTest');

    // Setting core-hello for language testing (test 3)
    const langTestEN = document.createElement('core-hello');
    langTestEN.setAttribute('id', 'langTestEN');
    const langTestES = document.createElement('core-hello');
    langTestES.setAttribute('id', 'langTestES');
    const langTestJP = document.createElement('core-hello');
    //sdasasda
    langTestJP.setAttribute('id', 'langTestJP');
    const langTestFR = document.createElement('core-hello');
    langTestFR.setAttribute('id', 'langTestFR');

    // Setting core-hello for rainbow testing (test 4)
    const rainbowTest = document.createElement('core-hello');
    rainbowTest.setAttribute('rainbow');
  });

  // test 1: Check that testElement is inserted into the DOM
  context('Inserted in DOM', () => {
    it('should return non-null object', () => {
      // retrieve testElement from the DOM
      const isRetrievable = document.getElementById('contentTest');
      chai.expect(isRetrievable).to.not.equal(null);
    });
  });

  // test 2: Check whatever's in the "slot" is displayed correctly
  context('Text in Slot', () => {
    it('should be Hello World, Team 13', () => {
      const document = window.document;
      // retrieve testElement from the DOM
      const contentTest = document.getElementById('contentTest');
      // the text in testElement slot
      const message = 'Hello World Team 13';

      contentTest.innerHTML(message);

      chai.expect(contentTest.innerHTML).to.equal(message);
    });
  });
  /*// test 3: Determine if the lang attribute functions correctly
  context('Lang attribute exist', () => {
    it('should return true', () => {
      const coreHelloElement = document.getElementById('testElement');

      const langExist = coreHelloElement.hasAttribute('lang');

      chai.expect(langExist).to.equal(true);
    });
  });

  // test 4: Determine if the rainbow attribute functions properly
  context('Rainbow attribute exist', () => {
    it('should return true', () => {
      const coreHelloElement = document.getElementById('testElement');

      const rainbowExist = coreHelloElement.hasAttribute('rainbow');

      chai.expect(rainbowExist).to.equal(true);
    });
  });
  */
});