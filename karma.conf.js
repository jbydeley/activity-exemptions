const webpackConfig = require('./webpack.config.js');

module.exports = function karmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      { pattern: 'test/**/*_test.js', watched: true },
    ],

    preprocessors: {
      'test/**/*_test.js': ['webpack'],
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    browsers: ['PhantomJS', 'Firefox', 'Chrome'],
    singleRun: false,
    concurrency: Infinity,
    webpack: webpackConfig,
  });
};