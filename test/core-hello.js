// view result.html for more context
describe('p element', () => {
  // set up test environment to have only one empty testElement in testArea
  beforeEach('init testing environment', () => {
    // remove testArea and reinsert before the test results for a clean slate
    document.body.removeChild(document.getElementById('testArea'));
    const testArea = document.createElement('div');
    testArea.setAttribute('id', 'testArea');
    document.body.insertBefore(testArea, document.getElementById('testTitle'));
    // create the test element
    const testElement = document.createElement('p');
    // set id value
    testElement.setAttribute('id', 'testElement');
    // insert into DOM as child of element with id as testArea
    testArea.appendChild(testElement);
  });

  // test 1: Check that testElement is inserted into the DOM
  context('Inserted in DOM', () => {
    it('should return non-null object', () => {
      // retrieve testElement from the DOM
      const isRetrievable = document.getElementById('testElement');
      chai.expect(isRetrievable).to.not.equal(null);
    });
  });

  // test 2: Check whatever's in the "slot" is displayed correctly
  context('Text in Slot', () => {
    it('should be Hello World, CSE 112', () => {
      // retrieve the test element
      const testElement = document.getElementById('testElement');
      // the text in testElement slot
      const message = 'Hello World, CSE 112';
      // set it's inner text
      testElement.innerHTML = message;
      chai.expect(testElement.innerHTML).to.equal(message);
    });
  });
});
