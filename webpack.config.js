const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        library: {
            name: 'Semafy',
            type: 'umd',
            umdNamedDefine: true,
        },
        filename: 'semafy.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
};