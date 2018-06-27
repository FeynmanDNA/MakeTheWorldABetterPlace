const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireMobx = require('react-app-rewire-mobx');

module.exports = function override(config, env) {
  //do stuff with the webpack config..
  //config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);  // change importing css to less
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#01807C",
      "@body-background": "#21242b"
    },
    javascriptEnabled: true,
  })(config, env);
  config = rewireMobx(config, env);
  return config;
};
