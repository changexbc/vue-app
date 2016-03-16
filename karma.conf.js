var webpackConf = require('./webpack.config')
delete webpackConf.entry
delete webpackConf.plugins.shift()
webpackConf.plugins[0].definitions={
    '__DEV__': false,
    '__TEST__': true,
    '__PRE__': false,
    '__PROD__': false
}

module.exports = function (karma) {
    karma.set({

// base path, that will be used to resolve files and exclude
        // basePath: './',

        frameworks: ['mocha'],

// list of files / patterns to load in the browser
        files: [
            {pattern: 'node_modules/should/should.js', include: true},
            {pattern: 'test/*_test.js', watched: false, included: true, served: true},
            'src/*.js',
            'src/*.vue'
        ],

        webpack:webpackConf,
        webpackMiddleware: {
          noInfo: true
        },

// list of files to exclude
        exclude: [
            'karma.conf.js'
        ],


// use dots reporter, as travis terminal does not support escaping sequences
// possible values: 'dots', 'progress', 'junit', 'teamcity'
// CLI --reporters progress
        reporters: ['dots', 'mocha', 'coverage','htmlalt'],

        mochaReporter: {
          output: 'autowatch'
        },

        preprocessors: {
          'src/*.js':['webpack'],
          'src/*.vue':['webpack'],
          'test/*.js':['webpack']
        },

        htmlReporter: {
          outputFile: 'unitTestResult/units.html',

          // Optional
          pageTitle: '单元测试',
          subPageTitle: '订单详情'
        },



//Code Coverage options. report type available:
//- html (default)
//- lcov (lcov and html)
//- lcovonly
//- text (standard output)
//- text-summary (standard output)
//- cobertura (xml format supported by Jenkins)
        coverageReporter: {
            // cf. http://gotwarlost.github.com/istanbul/public/apidocs/
            dir: 'coverage',
            reporters: [
                // reporters not supporting the `file` property
                { type: 'html', subdir: 'report-html' },
                { type: 'lcov', subdir: 'report-lcov' },
                // reporters supporting the `file` property, use `subdir` to directly
                // output them in the `dir` directory
                { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
                { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
                { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
                { type: 'text', subdir: '.', file: 'text.txt' },
                { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
            ]
        },

// web server port
        port: 9876,


// cli runner port
        runnerPort: 9100,


// enable / disable colors in the output (reporters and logs)
        colors: true,


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: karma.LOG_ERROR,


// enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
// CLI --browsers Chrome,Firefox,Safari
        browsers: ['PhantomJS'],


// If browser does not capture in given timeout [ms], kill it
        captureTimeout: 6000,


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
        singleRun: false,


        plugins: [
            require('karma-mocha'),
            require('karma-chrome-launcher'),
            require('karma-safari-launcher'),
            require('karma-phantomjs-launcher'),
            require('karma-coverage'),
            require('karma-mocha-reporter'),
            require('karma-htmlfilealt-reporter'),
            require('karma-webpack'),
        ]
    });
}