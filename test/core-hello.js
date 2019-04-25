describe('core-hello', () => {
  // test 2: Check whatever's in the "slot" is displayed correctly
  context('Text in Slot', () => {
    it('should be Hello World, CSE 112', () => {
      // create the core-hello element
      const myCoreHello = document.createElement('core-hello');
      // the text in myCoreHello slot
      const message = 'Hello World, CSE 112';
      // set it's inner text
      myCoreHello.innerHTML = message;
      chai.expect(myCoreHello.innerHTML).to.equal(message);
    });
  });
});
