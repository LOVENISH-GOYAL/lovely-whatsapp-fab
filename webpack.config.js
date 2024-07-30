const path = require('path');
module.exports = {
  entry: './src/WhatsappFAB.js', // Entry point of your application
  output: {
    filename: 'bundle.js', // Output file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/', // Output directory for images
            },
          },
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};