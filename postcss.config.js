module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // 'autoprefixer': process.env.BUILD_AMP_CSS === 'true' ? false : {},
    // 'autoprefixer': {},
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    "@buddye/postcss-remove-important": {},
    'postcss-amp-custom': process.env.BUILD_AMP_CSS === 'true' ? {
      enableByteLimit: process.env.NODE_ENV == "production"
    } : false,
    'cssnano': process.env.CSS_ENV === 'build' ? {
      preset: 'default'
    } : false,
  }
}
