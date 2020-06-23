module.exports = {
    // https://cli.vuejs.org/guide/deployment.html#github-pages
    // ex: https://tw-wong.github.io/vue-shopping-cart/
    
    publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-shopping-cart/'
      : '/'
  }