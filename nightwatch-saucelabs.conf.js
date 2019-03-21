module.exports = (function (settings) {

  settings.selenium = {
    start_process: false,
    host: 'ondemand.saucelabs.com',
    port: 80,
  };

  var defaultTestSettings = settings.test_settings.default;
  defaultTestSettings.selenium_port = 80;
  defaultTestSettings.selenium_host = 'ondemand.saucelabs.com';
  delete defaultTestSettings.default_path_prefix;

  defaultTestSettings.username = process.env.SAUCE_USERNAME;
  defaultTestSettings.access_key = process.env.SAUCE_ACCESS_KEY;
  defaultTestSettings.screenshots = {
    enabled: true,
    on_failure: true,
    on_error: true,
    path: './screenshots'
  };

  defaultTestSettings.desiredCapabilities = {
    browserName: 'chrome',
    platform: 'macOS 10.13',
    version: '65.0',
    //build: 'Build-Explore',
    commandTimeout: 600,
    maxDuration: 1200,
    idleTimeout: 600,
    screenResolution: '1600x1200',
    loggingPrefs: {
        browser: 'ALL',
        client: 'ALL',
        driver: 'ALL',
        server: 'ALL',
    },
    extendedDebugging: true
  }

  defaultTestSettings.globals.saucelabs = '../../util/saucelabs';

  // override the local one to prevent ChromeDriver start
  defaultTestSettings.globals.before = function(done) {
    done();
  }

  // override the local one to prevent ChromeDriver stop
  defaultTestSettings.globals.after = function(done) {
    done();
  }

  return settings;
})(require('./nightwatch.json'));
