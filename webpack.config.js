module.exports = {
  entry: './example/example.js',
  output: {
    filename: './example/bundle.js'       
  },
  resolve: {
    extensions: ['', '.js', '.jsx'] 
  },
  debug: true,
  cache: true,
  devtool: '#eval',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.less$/, 
        loader: 'style-loader!css-loader!less-loader'
      },
    ]
  }
};