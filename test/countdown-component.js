// https://github.com/eavichay/showroom-demo

const assert = require('assert');
const showroom = require('showroom/puppeteer')();

describe('countdown-component', async () => {
  before(async () => {
    await showroom.start();
    // starts showroom server
  });

  after(async () => {
    await showroom.stop();
    // stops the showroom server
  });

  beforeEach(async () => {
    await showroom.setTestSubject('countdown-component');
    await showroom.page.waitFor(150);
    // select the component with defaults from the descriptor file
  });

  it('Should display initial time', async () => {
    const innerText = await showroom.getProperty('innerText');
    assert.equal(innerText, '1:50');
  });

  it('Should count to zero and trigger events', async () => {
    await showroom.trigger('start');
    await showroom.page.waitFor(1500);
    const innerText = await showroom.getProperty('innerText');
    const [startEvent, ...restOfEvents] = await showroom.getEventList();
    const timeoutEvent = restOfEvents.pop();

    // assertions
    assert.equal(innerText, '0:00');
    assert.equal(startEvent.type, 'onstart');
    for (let i = 0; i < restOfEvents.length; i += 1) {
      assert.equal(restOfEvents[i].type, 'ontick');
    }
    assert.equal(timeoutEvent.type, 'ontimeout');
  });
});
