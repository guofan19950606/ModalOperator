module.exports = {
  configureWebpack: {
    externals: {
      axios: 'axios',
      lodash: '_',
      'view-design': 'iview',
      '@centit/api-core': 'apiCore',
      '@centit/api-admin': 'apiAdmin',
      '@centit/api-auth': 'apiAuth',
      '@centit/ui-layout': 'uiLayout',
      '@centit/ui-form': 'uiForm',
    },
  },
}
