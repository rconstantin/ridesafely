 var path = require('path');
 var webpack = require('webpack');

 module.exports = {
     entry: {
        app: './js/main.js'
        // ,
        // app1: './js/main1.js'
     },
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: '[name].bundle.js'
     },
     module: {
         rules: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',                
                 query: {
                     presets: ['react', 'es2015']
                 }
             }
         ]
     },
     externals: {
        jquery: 'jQuery'
     },
     plugins: [
       new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
       })
     ],
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };