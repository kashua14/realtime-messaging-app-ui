module.exports = {
    entry: __dirname,
    output: {
        path: '/'
    },
    devtool: 'source-maps',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-class-properties']
                }
            }
        ]
    }
}