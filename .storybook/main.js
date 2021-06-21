module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  typescript: {
    check: false,
    checkOptions: {}
  },
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.ts$/,
      loader: "ts-loader",
      options: { appendTsSuffixTo: [/\.vue$/] }
    });
    return config;
  }
};
