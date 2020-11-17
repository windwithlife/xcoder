

const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
var configfile = require('./utils/server-config');
let resourcePath = configfile.RESOURCE_PATH;
//const envName    = configfile.ENV_NAME;
//resourcePathMatchSource = resourcePath + "/_next/:slug*";
// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
)

module.exports = withLess({
  publicRuntimeConfig: {
    envName: configfile.ENV_NAME,
  },
  basePath: resourcePath, //process.env.NODE_ENV === "production" ? resourcePath: "" ,
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
    //   config.node = {
    //     fs: 'empty',
    //     net: 'empty',
    //     tls: 'empty'
    // }
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