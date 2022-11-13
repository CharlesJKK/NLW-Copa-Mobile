module.exports = {
  presets: ['module:metro-react-native-babel-preset',
  'module:react-native-dotenv'],
  "plugins": [
    ["module:react-native-dotenv", {
      "envName": "APP_ENV",
      "moduleName": "@env",
      "path": ".env",
    }]
  ]
};
