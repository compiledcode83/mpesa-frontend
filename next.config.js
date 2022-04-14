module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
    exclude: ["node_modules"]
  },
  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true,
  // },
  webpack(config, options) {
    // config.module.rules.push({
    //   test: /\.graphql$/,
    //   exclude: /node_modules/,
    //   use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
    // })

    // config.module.rules.push({
    //   test: /\.graphqls$/,
    //   exclude: /node_modules/,
    //   use: ['graphql-let/schema/loader'],
    // })

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader',
    })

    return config
  },
}