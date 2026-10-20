/**
 * ==============================================================================
 * 📦 TỆP CẤU HÌNH THAM KHẢO WEBPACK (WEBPACK 5 SAMPLE CONFIGURATION)
 * ==============================================================================
 * 
 * 💡 LƯU Ý DÀNH CHO BÁO CÁO ĐỒ ÁN / PHỎNG VẤN:
 * Dự án chính thức của Hoàng Long Quán hiện đang sử dụng VITE 5 (trong tệp vite.config.js)
 * vì tốc độ khởi động nhanh hơn 10-20 lần nhờ Native ES Modules.
 * 
 * Tệp này được tạo sẵn để phục vụ:
 * 1. Nộp báo cáo học phần "Đóng gói mã nguồn với Webpack".
 * 2. Giải thích cho Giảng viên về 4 khái niệm cốt lõi: Entry, Output, Loaders và Plugins.
 * ==============================================================================
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    // 1. ENTRY: Điểm xuất phát của ứng dụng React
    entry: path.resolve(__dirname, 'client/src/main.jsx'),

    // 2. OUTPUT: Nơi xuất file bundle sau khi đóng gói
    output: {
      path: path.resolve(__dirname, 'client/dist'),
      filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].bundle.js',
      clean: true, // Tự động dọn dẹp thư mục dist trước khi build mới
      publicPath: '/'
    },

    // 3. RESOLVE: Tự động nhận diện đuôi file khi import
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'client/src')
      }
    },

    // 4. MODULE & LOADERS: Bộ chuyển đổi định dạng file
    module: {
      rules: [
        // Chuyển đổi React JSX & ES6+ sang JavaScript chuẩn ES5 tương thích mọi trình duyệt
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                ['@babel/preset-react', { runtime: 'automatic' }]
              ]
            }
          }
        },

        // Xử lý CSS và Tailwind CSS
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader' // Nạp Tailwind CSS & Autoprefixer
          ]
        },

        // Xử lý file ảnh (PNG, JPG, SVG, WebP)
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash:8][ext]'
          }
        },

        // Xử lý font chữ Hán Nôm & Thư pháp
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash:8][ext]'
          }
        }
      ]
    },

    // 5. PLUGINS: Các tiện ích mở rộng
    plugins: [
      // Tự động nhúng file bundle vào template index.html
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'client/index.html'),
        title: 'Hoàng Long Quán - 皇龍樓',
        favicon: false
      }),

      // Tách riêng file CSS khi build Production
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: 'css/[name].[contenthash:8].css'
            })
          ]
        : [])
    ],

    // 6. DEV SERVER: Máy chủ phục vụ môi trường lập trình Local
    devServer: {
      static: path.resolve(__dirname, 'client/dist'),
      port: 5173,
      hot: true,
      historyApiFallback: true, // Hỗ trợ điều hướng Single Page Application (SPA)
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:5000',
          changeOrigin: true
        }
      ]
    },

    // Tối ưu dung lượng khi deploy Production
    optimization: {
      splitChunks: {
        chunks: 'all' // Tách vendor libraries (React, ReactDOM) thành chunk riêng
      }
    },

    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map'
  };
};
