const https = require('https');

module.exports = function sauce(browser, callback) {
  const currentTest = browser.currentTest;
  const sessionId = browser.capabilities['webdriver.remote.sessionid'];
  const username = browser.options.username;
  const accessKey = browser.options.accessKey;

  if (!username || !accessKey || !sessionId) {
    console.log(browser);
    console.log('No username, accessKey or sessionId');
    return callback();
  }

  const passed = currentTest.results.passed === currentTest.results.tests;

  const data = JSON.stringify({
    passed
  });

  const requestPath = `/rest/v1/${username}/jobs/${sessionId}`;

  function responseCallback(res) {
    res.setEncoding('utf8');
    //console.log('Response: ', res.statusCode, JSON.stringify(res.headers));
    res.on('data', function onData(chunk) {
      //console.log('BODY: ' + chunk);
    });
    res.on('end', function onEnd() {
      console.info('Finished updating saucelabs');
      callback();
    });
  }

  try {
    console.log(`Saucelabs test result direct link: https://saucelabs.com/jobs/${sessionId}`)
    console.log('Updating saucelabs job', requestPath);

    const req = https.request({
      hostname: 'saucelabs.com',
      path: requestPath,
      method: 'PUT',
      auth: `${username}:${accessKey}`,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    }, responseCallback);

    req.on('error', function onError(e) {
      console.log('problem with request: ' + e.message);
    });
    req.write(data);
    req.end();
  } catch (error) {
    console.log('Error', error);
    callback();
  }
};
