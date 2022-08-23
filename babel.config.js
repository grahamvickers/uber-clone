module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["react-native-reanimated/plugin"],
    plugins: ["tailwindcss-react-native/babel"],
    plugins: [
      ["module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
      }]
    ],
  };
};
