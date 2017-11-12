/* eslint comma-dangle: ["warn", "always-multiline"] */
// https://medium.com/@nikgraf/why-you-should-enforce-dangling-commas-for-multiline-statements-d034c98e36f8

const { resolve } = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/*
 getIfUtils will allow us to do ifProd()/ifDev()
 removeEmpty will remove `undefined` from arrays
 */
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

const PATHS = {
    output: resolve(__dirname, 'build/'),
    app: resolve(__dirname, 'app/app.module.js'),
    assets: resolve(__dirname, 'assets/'),
    nodeModules: resolve(__dirname, 'node_modules'), // Isto está aqui para resolver problemas com projetos de ligação npm
};


module.exports = (env) => {
    // process.env variables
    const devServerPort = parseInt(process.env.PORT, 10) || 3000;

    const { ifDev, ifProd } = getIfUtils(env);

    // A configuração real que é retornada no final desta função
    const webpackConfig = {

        // https://webpack.js.org/configuration/dev-server/
        devServer: {
            port: devServerPort,
            publicPath: `http://localhost:${devServerPort}/`,
            clientLogLevel: 'none',
            // https: true, // Uncomment this if you want to serve with https
            compress: true,
            historyApiFallback: true,
            watchOptions: {
                ignored: /node_modules/,
            },
        },

        // https://webpack.js.org/configuration/devtool/
        devtool: 'source-map',

        entry: {
            // Configurar o nosso ponto de entrada principal para o processamento
            app: removeEmpty([
                ifDev(`webpack-dev-server/client?http://localhost:${devServerPort}/`),
                PATHS.app,
            ]),
        },


        // configura o caminho de saída
        output: {
            filename: '[name].bundle.js',
            path: PATHS.output,
            pathinfo: ifDev(),
        },

        bail: ifProd(),

        resolve: {
            modules: [
                PATHS.nodeModules, // Isto está aqui para resolver problemas com projetos de ligação npm
            ],
        },

        /*
          Cada um dos seguintes objetos carregadores descreve o processo para executar tipos de arquivos específicos.
          Por exemplo, os arquivos .scss são executados pelo sass-resources-loader, então o sass-loader,
          seguido pelo css-loader e, finalmente, pelo carregador de estilo.
        */

        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader',
                        publicPath: '../',
                    }),
                },
                {
                    test: /\.scss$/, // Os arquivos Sass com apenas o sufixo .scss são processados ​​normalmente
                    exclude: /\.module.scss$/,
                    loader: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader',
                        use: [{
                                loader: 'css-loader',
                                options: {
                                    sourceMap: ifDev(),
                                },
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: ifDev(),
                                },
                            }
                        ],
                    }),
                },
                {
                    test: /\.module.scss$/, // Os arquivos Sass que possuem o sufixo .module.scss serão processados ​​com os módulos css habilitados (https://github.com/webpack/css-loader#css-modules)
                    loader: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader',
                        use: [{
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    camelCase: true,
                                    sourceMap: ifDev(),
                                    importLoaders: 2,
                                    localIdentName: '[name]__[local]___[hash:base64:5]',
                                },
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: ifDev(),
                                },
                            }
                        ],
                    }),
                },
                {
                    test: /\.(gif|png|jpg|jpeg)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'images/[name].[ext]',
                    },
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        mimetype: 'image/svg+xml',
                        name: 'images/[name].[ext]',
                    },
                },
                {
                    test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        mimetype: 'application/font-woff',
                        name: 'fonts/[name].[ext]',
                    },
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        mimetype: 'application/octet-stream',
                        name: 'fonts/[name].[ext]',
                    },
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                    },
                },
                {
                    test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                    },
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                },
            ],
        },

        plugins: removeEmpty([
            new webpack.LoaderOptionsPlugin({
                minimize: ifProd(),
                debug: ifDev(),
            }),

            // Extraia todos os scss compilados em um único arquivo css.
            new ExtractTextPlugin({
                filename: 'css/app.css',
                allChunks: true,
            }),

            // Injeta bundles em seu index.html em vez de fazer a fiação de todos manualmente.
            // Ele também adiciona hash a todos os ativos injetados, portanto não temos problemas
            // com purga de cache durante a implantação.
            new HtmlWebpackPlugin({
                template: 'app/index.html',
                inject: 'body',
                hash: true,
            }),

            // Força o programa webpack-dev-server para escrever arquivos de bundle no sistema de arquivos.
            // Útil para o dev iônico ao usar ecarrga iónica ao vivo.
            ifDev(new WriteFilePlugin({ log: false })),

            // Live reloading via BrowserSync
            ifDev(new BrowserSyncPlugin(
                // BrowserSync options
                {
                    host: 'localhost',
                    port: devServerPort + 1,
                    open: false,
                    logLevel: 'silent',
                    logConnections: false,
                    logFileChanges: false,
                    logSnippets: false,
                    // proxy the Webpack Dev Server endpoint through BrowserSync
                    proxy: `http://localhost:${devServerPort}/`,
                },
                // plugin options
                {
                    // prevent BrowserSync from reloading the page
                    // and let Webpack Dev Server take care of this
                    reload: false,
                }
            )),

            // PROD
            ifProd(new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"',
                },
            })),
            ifProd(new webpack.optimize.UglifyJsPlugin({
                screw_ie8: true, // eslint-disable-line
                warnings: false,
            })),


            new CopyWebpackPlugin([{
                from: PATHS.assets,
                to: PATHS.output.concat('/assets')
            }]),
            // Store all remaining chunks not part of the app into the common bundle.
            // ifProd(new webpack.optimize.CommonsChunkPlugin({
            //   name: 'common',
            //   filename: 'common.bundle.js',
            // })),
        ]),
    };

    return webpackConfig;
};