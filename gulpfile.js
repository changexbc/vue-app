var gulp = require('gulp')
var gutil = require("gulp-util")
var gulpSequence = require('gulp-sequence')
var fs = require("fs")
var path = require("path")
var clean = require('gulp-clean')
var colors = require('colors')
var plumber = require('gulp-plumber')
var zip = require('gulp-zip')
var md5 = require("gulp-md5-plus");
var imagemin = require("gulp-imagemin")
var pngquant = require('imagemin-pngquant')
var webpack = require("webpack")
var webpackDevServer = require("webpack-dev-server")
var webpackConfig = require("./webpack.config.js")


var appId = 'youka'
var buildPath = 'build_folder/'+appId
var buildTime = function() {
    var timestamp = new Date().getTime()
    fs.writeFileSync(path.join(__dirname, 'CERT'), '{"lastmodified":"' + timestamp + '"}');
    console.log(colors.green.underline('Timestamp:' + timestamp))
}

gulp.task('clean', function () {
    return gulp.src([buildPath,'build_zip/'+appId+'.zip',path.join(__dirname, '/static')],{read: false})
        .pipe(clean({force: true}))
});
gulp.task('imagemin', function () {
    return gulp.src('./static/*.{png,jpg,jpeg}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(buildPath + '/static'));
});
gulp.task('movehtml', function() {
    return gulp.src('./*.html')
        .pipe(gulp.dest(buildPath));
});
gulp.task('movejs', function() {
    return gulp.src('./static/{*.js,*.js.map}')
        .pipe(gulp.dest(buildPath +'/static'));
});
gulp.task('md5', function() {
    return gulp.src('./static/*.js')
        .pipe(md5(10,buildPath+'/*.html'))
        .pipe(gulp.dest(buildPath +'/static'));
});
gulp.task('zip', function() {
    return gulp.src([buildPath +'/**'],{ base: __dirname + '/build_folder' })
        .pipe(zip(appId + '.zip'))
        .pipe(gulp.dest(__dirname+'/build_zip'));
});

// Production build
gulp.task("webpack:prod", ['clean'], function(callback) {
    buildTime()
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = [
        new webpack.ProvidePlugin({
            "$": "zepto",
            "Zepto": "zepto",
            "window.Zepto": "zepto",
            "_": "lodash",
            "FastClick": "fastclick"
        }),
        new webpack.DefinePlugin({
            '__DEV__': false,
            '__TEST__': false,
            '__PRE__': false,
            '__PROD__': true,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]

    // run webpack
    webpack(myConfig, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:prod", err);
        gutil.log("[webpack:prod]", stats.toString({
            colors: true
        }));
        callback();
    });
});

// Production build
gulp.task("webpack:dev", ['clean'], function(callback) {
    buildTime()
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = [
        new webpack.ProvidePlugin({
            "$": "zepto",
            "Zepto": "zepto",
            "window.Zepto": "zepto",
            "_": "lodash",
            "FastClick": "fastclick"
        }),
        new webpack.DefinePlugin({
            '__DEV__': false,
            '__TEST__': false,
            '__PRE__': false,
            '__PROD__': true,
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]

    // run webpack
    webpack(myConfig, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:prod", err);
        gutil.log("[webpack:prod]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack-dev-server",function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "#source-map";
    myConfig.debug = true;
    myConfig.entry.app.unshift("webpack-dev-server/client?http://0.0.0.0:8080", "webpack/hot/dev-server");
    // Start a webpack-dev-server
    new webpackDevServer(webpack(myConfig), {
        hot: true,
        publicPath: '/static/',
        stats: {
            colors: true
        }
    }).listen(8080, "0.0.0.0", function(err) { //修改第二个参数为0.0.0.0可以使用ip访问,方便手机端调试
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/detail.html");
    });
});



gulp.task("default", ["webpack-dev-server"]);
gulp.task("dev", gulpSequence("webpack:dev",'movehtml',['md5','imagemin'],"zip"));
gulp.task("prod", gulpSequence("webpack:prod",'movehtml',['md5','imagemin'],"zip"));
