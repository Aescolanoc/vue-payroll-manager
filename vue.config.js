const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack"); //To avoid the warning

module.exports = defineConfig({
  transpileDependencies: true,

  // start To avoid the warning "runtime-core.esm-bundler.js:4060 Feature flag __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ is not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle."
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true, // habilitar/deshabilitar API de opciones
        __VUE_PROD_DEVTOOLS__: false, // habilitar/deshabilitar herramientas de desarrollo en producción
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // define esta bandera explícitamente
      }),
    ],
  },
  //end to avoid warning
});
