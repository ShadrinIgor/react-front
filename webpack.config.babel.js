import path from 'path';
// import crypto from 'crypto';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ModernizrWebpackPlugin from 'modernizr-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import {loadConfig} from 'config/helpers';

const DIR_SRC = 'src';
const DIR_BUILD = 'build';
const NODE_ENV = process.env.NODE_ENV || 'development';
const NODE_ENV_IP = process.env.IP;
const NODE_ENV_PRODUCTION = (NODE_ENV === 'production');
const NODE_ENV_DEVELOPMENT = (NODE_ENV === 'development');
const CONFIG_SAMPLE = loadConfig('../config.sample.yaml');
const CONFIG_USER = loadConfig('../config.yaml');
const CONFIG = webpackMerge(CONFIG_SAMPLE, CONFIG_USER);
const CONFIG_ENV = NODE_ENV_PRODUCTION ? CONFIG.production : CONFIG.development;

const SERVER_STATIC = NODE_ENV_IP ? (`http://${NODE_ENV_IP}:${CONFIG.devServer.port}/`) : CONFIG_ENV.CDN;
const CDN_PATH = NODE_ENV_PRODUCTION ? SERVER_STATIC : (`//${CONFIG.devServer.host}:${CONFIG.devServer.port}/`);
const HASH = 'assets'; // 'NODE_ENV_DEVELOPMENT ? '' : crypto.randomBytes(7).toString('hex');
const ENTRY_CORE = ['./assets/js/main'];
const ENTRY_PRODUCTION = ['babel-polyfill'].concat(ENTRY_CORE);
const ENTRY_DEVELOPMENT = [`webpack-dev-server/client?http://${CONFIG.devServer.host}:${CONFIG.devServer.port}`, 'webpack/hot/only-dev-server'].concat(ENTRY_CORE);
const UglifyJsOptions = {
  comments: false,
  'screw-ie8': true,
  mangle: false,
  include: /\.js$/,
  sourceMap: NODE_ENV_DEVELOPMENT,
  compress: {
    drop_console: true,
    drop_debugger: true,
    dead_code: true,
    unsafe: true,
    warnings: false
  }
};
const POSTCSSOptions = {
  importLoaders: 0,
  sourceMap: NODE_ENV_DEVELOPMENT,
  options: {
    plugins() {
      return [
        require('pixrem')(),
        require('autoprefixer')({
          add: true,
          browsers: [
            '> 0.5% in my stats',
            'ie >= 9'
          ]
        }),
        require('css-mqpacker')(),
        require('cssnano')({
          discardComments: true,
          optimiseSelectors: true,
          uniqueSelectors: true,
          mergeRules: true,
          discardUnused: {
            keyframes: true
          },
          counterStyle: true,
          fontFace: true,
          discardDuplicates: true,
          minifyGradients: true
        })
      ];
    }
  }
};

module.exports = {
  context: path.resolve(__dirname, DIR_SRC),
  entry: {
    bundle: NODE_ENV_DEVELOPMENT ? ENTRY_DEVELOPMENT : ENTRY_PRODUCTION
  },

  output: {
    path: path.join(__dirname, `/${DIR_BUILD}`),
    publicPath: !NODE_ENV_DEVELOPMENT ? CDN_PATH : '/',
    filename: !NODE_ENV_DEVELOPMENT ? (`${HASH}/[name].[hash].js`) : 'assets/js/[name].js',
    chunkFilename: !NODE_ENV_DEVELOPMENT ? (`${HASH}/[id].[chunkhash].js`) : 'assets/js/[id].js'
  },

  watch: NODE_ENV_DEVELOPMENT,

  watchOptions: {
    aggregateTimeout: 100
  },

  node: {
    fs: 'empty'
  },

  devtool: NODE_ENV_DEVELOPMENT ? 'cheap-inline-module-source-map' : false,

  module: {
    rules: [
      {
        exclude: ['node_modules'],
        loader: 'babel',
        test: /\\.js?$/
      }, {
        test: /[\\\/]modernizr[\\\/]modernizr\.js$/,
        loader: 'imports?this=>window!exports?window.Modernizr'
      }, {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        include: [path.join(__dirname, `/${DIR_SRC}/assets/js`), path.join(__dirname, '/__mocks__')],
        loader: 'babel-loader'
      }, {
        test: /(main\.sass|app\.sass)/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: NODE_ENV_DEVELOPMENT
            }
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 0,
              sourceMap: NODE_ENV_DEVELOPMENT
            }
          }, {
            loader: 'resolve-url-loader'
          }, {
            loader: 'postcss-loader',
            options: POSTCSSOptions
          }, {
            loader: 'sass-loader',
            options: {
              modules: true,
              sourceMap: NODE_ENV_DEVELOPMENT
            }
          }
        ]
      }, {
        test: /\.(sass|scss)$/,
        exclude: /(node_modules|main\.sass|app\.sass)/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: NODE_ENV_DEVELOPMENT
            }
          }, {
            loader: 'css-loader',
            options: {
              modules: true,
              allowMultiple: true,
              importLoaders: 1,
              localIdentName: '[hash:base64:7]',
              sourceMap: NODE_ENV_DEVELOPMENT
            }
          }, {
            loader: 'resolve-url-loader'
          }, {
            loader: 'postcss-loader',
            options: POSTCSSOptions
          }, {
            loader: 'sass-loader',
            options: {
              modules: true,
              sourceMap: NODE_ENV_DEVELOPMENT
            }
          }
        ]
      }, {
        test: /\.md/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'html-loader'
          }, {
            loader: 'markdown-loader',
            options: {
              pedantic: true
            }
          }
        ]
      }, {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        include: path.join(__dirname, `/${DIR_SRC}/assets/fonts`),
        exclude: /(node_modules|img)/,
        loader: `file-loader?name=${NODE_ENV_PRODUCTION ? (`${HASH}/[hash].[ext]`) : '[path][name].[ext]?[hash]'}`
      }, {
        test: /\.svg$|\.png$|\.jpe?g$|\.gif$|\.ico$/,
        include: [
          path.join(__dirname, `/${DIR_SRC}/assets/img`),
          path.join(__dirname, `/${DIR_SRC}/assets/js`)
        ],
        exclude: /(node_modules|fonts)/,
        loader: `file-loader?name=${NODE_ENV_PRODUCTION ? (`${HASH}/[hash].[ext]`) : '[path][name].[ext]?[hash]'}`
      }, {
        test: /\.js$/,
        include: [
          path.join(__dirname, '/node_modules/es6-promise-polyfill'),
          path.join(__dirname, '/node_modules/bowser'),
          path.join(__dirname, `${DIR_SRC}/assets/js/oldBrowser`)
        ],
        loader: `file-loader?name=${NODE_ENV_PRODUCTION ? (`${HASH}/[hash].[ext]`) : '[path][name].[ext]?[hash]'}`
      }
    ]
  },

  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      HASH: JSON.stringify(HASH),
      CDN_PATH: JSON.stringify(CDN_PATH),
      NODE_ENV_IP: JSON.stringify(NODE_ENV_IP),
      CONFIG: JSON.stringify(CONFIG_ENV)
    }),

    new CleanWebpackPlugin([DIR_BUILD], {
      root: __dirname,
      verbose: true,
      dry: false,
      exclude: []
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
      async: false,
      children: false,
      minSize: 51200
    }),
    /** new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200
    }), */
    new HtmlWebpackPlugin({
      template: `./index.ejs`,
      inject: false,
      minify: {
        removeComments: NODE_ENV_PRODUCTION,
        collapseWhitespace: NODE_ENV_PRODUCTION,
        minifyJS: UglifyJsOptions,
        minifyCSS: NODE_ENV_PRODUCTION
      }
    }),
    new ModernizrWebpackPlugin({
      filename: 'assets/modernizr',
      noChunk: false,
      'feature-detects': [
        'forms/placeholder',
        'speech/speech-recognition',
        'speech/speech-synthesis'
      ],
      options: [
        'setClasses'
      ]
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      _: 'underscore',
      CONFIG: CONFIG_ENV
    })
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    alias: {
      js: path.resolve(__dirname, 'src/assets/js/'),
      styles: path.resolve(__dirname, 'src/assets/styles/'),
      img: path.resolve(__dirname, 'src/assets/img/'),
      fonts: path.resolve(__dirname, 'src/assets/fonts/'),
      config: path.resolve(__dirname, 'config/'),
      __mocks__: path.resolve(__dirname, '__mocks__/')
    }
  },

  resolveLoader: {
    moduleExtensions: ['*-loader', '*'],
    extensions: ['.js']
  },

  devServer: {
    ...CONFIG.devServer,
    open: false,
    hot: NODE_ENV_DEVELOPMENT,
    inline: NODE_ENV_DEVELOPMENT,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': 'null',
      'Access-Control-Allow-Credentials': 'true'
    }
  }
};

if (NODE_ENV_PRODUCTION) {
  module.exports.module.rules.push({
    test: /\.(svg)$/i,
    loader: 'image-webpack-loader',
    include: [
      path.join(__dirname, `/${DIR_SRC}/assets/img`),
      path.join(__dirname, `/${DIR_SRC}/assets/js`)
    ],
    exclude: /(node_modules|fonts|src)/,
    options: {
      progressive: true,
      optipng: {
        optimizationLevel: 7
      },
      gifsicle: {
        interlaced: false
      },
      svgo: {
        plugins: [
          {removeViewBox: true},
          {removeComments: true},
          {removeEmptyAttrs: true},
          {minifyStyles: true},
          {convertStyleToAttrs: true},
          {removeUselessStrokeAndFill: true},
          {convertPathData: true},
          {cleanupIDs: true}
        ]
      }
    }
  });
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin(UglifyJsOptions));
} else {
  module.exports.plugins.push(new BundleAnalyzerPlugin());
}
