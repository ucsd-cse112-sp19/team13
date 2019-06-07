const PercyScript = require('@percy/script');

// window.addEventListener('WebComponentsReady', function() {
//     console.log('WCs Ready');
//     window.dispatchEvent(new CustomEvent('percy-ready'));
// });
PercyScript.run(async (page, percySnapshot) => {
  await page.goto('http://localhost:8000/');
  await percySnapshot('homepage');
});
