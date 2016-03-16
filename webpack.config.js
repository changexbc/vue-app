var path = require('path')
var webpack = require('webpack')
var vue = require('vue-loader')

module.exports = {
    entry: {
        app: ['./src/main.js']
    },
    output: {
        path: path.join(__dirname, 'static'),
        publicPath: 'static/',
        filename: 'build.js'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\/|src\/libs\//,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=1000'
        }]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    vue: {
        autoprefixer: true,
        autoprefixer: {
            // browsers: ['last 2 versions']
        }
    },
    resolve: {
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            zepto: path.join(__dirname, 'src/libs/zepto/zepto.js'),
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            '__DEV__': true,
            '__TEST__': false,
            '__PRE__': false,
            '__PROD__': false
        }),
        new webpack.ProvidePlugin({
            "$": "zepto",
            "Zepto": "zepto",
            "window.Zepto": "zepto",
            "_": "lodash",
            "FastClick": "fastclick",
            "Daze":path.join(__dirname,'src/libs_native/native')
        })
    ]

}
