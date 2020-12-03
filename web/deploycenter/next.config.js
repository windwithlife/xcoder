

const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')

const config    = require('./utils/config');
const BASE_PATH = config.application.contextPath;
const ENV_NAME  = config.envName;

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
)

module.exports = withLess({
  publicRuntimeConfig: {
    envName: ENV_NAME,
  },
  basePath: BASE_PATH, //process.env.NODE_ENV === "production" ? resourcePath: "" ,
  async rewrites() {
    return [
      // {
      //   source: '/',
      //   destination: '/applicationrelease/home',
      // },
      // {
      //   source: resourcePath + '/:slug*',
      //   destination: '/:slug*',
      // },
    ]
  },
  // assetPrefix: process.env.NODE_ENV === "production" ? resourcePath: "" ,
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // make your antd custom effective
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }
    return config
  },
})