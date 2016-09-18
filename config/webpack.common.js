const webpack = require('webpack');
const helpers = require('./helpers');
var webpackConfig = require('webpack-config');
const nodeExternals = require('webpack-node-externals');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = webpackConfig.Config().merge({
  /*
  * The entry point for the bundle
  *
  * See: http://webpack.github.io/docs/configuration.html#entry
  */
  entry: {
    'main': './src/index.ts'
  },

  externals: [nodeExternals()],

  /*
  * Options affecting the resolving of modules.
  *
  * See: http://webpack.github.io/docs/configuration.html#resolve
  */
  resolve: {

    /*
    * An array of extensions that should be used to resolve modules.
    *
    * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
    */
    extensions: ['', '.ts', '.js', '.json'],

    // Make sure root is src
    root: helpers.root('src'),

    // remove other default values
    modulesDirectories: ['node_modules']
  },

  /*
  * Options affecting the normal modules.
  *
  * See: http://webpack.github.io/docs/configuration.html#module
  */
  module: {

    /*
    * An array of applied pre and post loaders.
    *
    * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
    */
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'string-replace-loader',
        query: {
          search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
          replace: '$1.import($3).then(mod => (mod.__esModule && mod.default) ? mod.default : mod)',
          flags: 'g'
        },
        include: [helpers.root('src')]
      },

    ],

    /*
    * An array of automatically applied loaders.
    *
    * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
    * This means they are not resolved relative to the configuration file.
    *
    * See: http://webpack.github.io/docs/configuration.html#module-loaders
    */
    loaders: [

      /*
      * Typescript loader support for .ts and Angular 2 async routes via .async.ts
      *
      * See: https://github.com/s-panferov/awesome-typescript-loader
      */
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },

      /*
      * Json loader support for *.json files.
      *
      * See: https://github.com/webpack/json-loader
      */
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]

  },

  /*
  * Add additional plugins to the compiler.
  *
  * See: http://webpack.github.io/docs/configuration.html#plugins
  */
  plugins: [
    /**
       * Plugin: ContextReplacementPlugin
       * Description: Provides context to Angular's use of System.import
       * 
       * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
       * See: https://github.com/angular/angular/issues/11580
       */
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('src') // location of your src
    )
  ],

  /*
  * Include polyfills or mocks for various node stuff
  * Description: Node configuration
  *
  * See: https://webpack.github.io/docs/configuration.html#node
  */
  node: {
    global: 'window',
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
});
