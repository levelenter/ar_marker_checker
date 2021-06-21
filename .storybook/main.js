module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
<<<<<<< HEAD
  typescript: {
    check: false,
    checkOptions: {}
  },
=======
>>>>>>> 0498829adb75e31f88be27643df5d4842960e706
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.ts$/,
      loader: "ts-loader",
      options: { appendTsSuffixTo: [/\.vue$/] }
    });
    return config;
  }
};
