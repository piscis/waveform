var webpack = require('webpack');

module.exports = {
    entry: './src/module.tsx',
    output: {
        path: __dirname + "/dist",
        library: "ReactWaveformWidget",
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: __dirname+"/dist",
        noInfo: true,
        hot: true,
        inline: true
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    resolveLoader: {
        alias: {
            'copy': 'file-loader?name=[path][name].[ext]&context=./src'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: "React",
            react: "React",
            "window.react": "React",
            "window.React": "React"
        }),
        //new webpack.optimize.UglifyJsPlugin({compress: {
        //    warnings: false
        //}})
    ],
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {test: /\.tsx?$/, loader: 'ts-loader'}
        ]
    }
};