// webpack.config.js

const path = require('path');

module.exports = {
  // Add resolve fallback for node.js core modules if necessary
  resolve: {
    fallback: {
      fs: require.resolve('path-browserify'),
      path: require.resolve('path-browserify'),
    },
  },
};
