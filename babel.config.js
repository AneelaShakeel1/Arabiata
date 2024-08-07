module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],

    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '~': './src',
          '@src': './src',
          '@shared': './src/app/shared',
          '@lib': './src/app/lib',
          '@assets': './src/app/assets',
          '@theme': './src/app/assets/styles',
          '@screens': './src/app/screens',
          '@navigation': './src/app/navigators/AppNavigator',
        },
      },
    ],
  ],
};