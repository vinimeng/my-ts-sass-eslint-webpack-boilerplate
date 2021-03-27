const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    // bundling mode
    mode: 'production',

    // generate source map
    devtool: 'source-map',  

    // entry files
    entry: path.resolve( __dirname, './assets/ts/sys.ts'),

    // output bundles (location)
    output: {
        path: path.resolve( __dirname, './assets/'),
        filename: 'js/[name].js',
    },

    // file resolutions
    resolve: {
        extensions: [ '.ts', '.js' ],
    },

    plugins: [new MiniCssExtractPlugin({
        filename: 'css/[name].css',
    })],

    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new CssMinimizerPlugin(),
        ],
    },
};
