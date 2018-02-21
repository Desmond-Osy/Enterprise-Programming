const webpack = require('webpack');

module.exports = {
    entry: {
        main: './wwwroot/js/app.js'
    },
    devtool: 'source-map',
    output: {
        path: __dirname + '/wwwroot/dist/js',
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|png)$/,
                loaders: [
                    'url-loader'
                ]
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '../fonts/',    // where the fonts will go
                        publicPath: '/dist/fonts/' // override the default path
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({ // inject ES5 modules as global vars
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            Tether: 'tether'
        })
    ]
}