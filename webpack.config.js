const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config =  {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return  config
}

const cssLoaders = extra => {
    const loaders =  [MiniCssExtractPlugin.loader, 'css-loader']

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js']
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        static: './dist',
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
           
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
               
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            {
                test: /\.css$/i,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
            
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
         template: './index.html',
         minify: {
             collapseWhitespace: isProd
         }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/beetroot.png'), 
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'src/img'),
                    to: path.resolve(__dirname, 'dist/img')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        })

    ]
  
}