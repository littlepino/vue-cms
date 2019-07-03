const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin')
//两个作用
//1.自动在内存中根据指定页面生成一个内存的页面
//2.自动，把打包好的bundle.js追加到页面中

//这个配置文件，其实就是一个js文件，通过node中的模块操作，向外暴露了一个配置对象
module.exports = {
    mode: 'development',
    entry: './src/main.js',//入口，表示要使用webpack打包哪个文件
    output: {
        path: path.resolve(__dirname,'dist'),//指定打包好的文件，输出到哪个目录中去
        filename: 'bundel.js'
    },
    plugins: [
        new HtmlWebpackPlugin({//创建一个在内存中生成HTML页面的插件
            template: path.join(__dirname,'./src/index.html'),//指定的模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename: 'index.html'

        }),
        new VueLoaderPlugin()
    ],
    module: {//这个节点用于配置所有第三方模块加载器
        rules: [//所有第三方模块的匹配规则
            { test: /\.css$/,use: ['style-loader','css-loader'] },//这是配置处理,css文件的第三方loader规则
            { test: /\.less$/,use: ['style-loader','css-loader','less-loader'] },//配置处理.less文件的第三方loader规则
            { test: /\.scss$/,use: ['style-loader','css-loader','sass-loader'] },
            //处理scss的loader
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631$name=[name].[ext]' },//处理图片路径的loader，
            //limit给定的值，是图片的大小，单位是byte，如果我们引用的图片，大于或等于给定的limit值，则不会被转为base64格式的字符串，如果图片小于给定的limit值，则会被转为base64的字符串
            { test: /\.(ttf|eot|svg|woff|woff2)$/,use: 'url-loader' },//处理字体文件的配置项
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']
                  }
                }
              },
            { test: /\.vue$/,use: 'vue-loader' }//处理.vue文件的loader
        ]

    },
    resolve: {
        alias: {//修改导入vue文件包的路径
            "vue$": "vue/dist/vue.js"
        }
    }

}