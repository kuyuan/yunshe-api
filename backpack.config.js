const path = require('path');

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = [
      './src/main.ts'
    ]

    config.resolve = {
      extensions: [".ts", ".js", ".json"],
      alias: {
        '@schemaTypes': path.resolve(__dirname, 'src/types'),
        '@loaders': path.resolve(__dirname, 'src/loaders'),
        '@models': path.resolve(__dirname, 'src/models'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@resolvers': path.resolve(__dirname, 'src/resolvers'),
        '@support': path.resolve(__dirname, 'support'),
        '@prisma': path.resolve(__dirname, 'generated/prisma-client')
      }
    };

    config.module.rules.push(
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
      {
        exclude: /node_modules/,
        test: /\.gql$/,
        use: [{ loader: 'graphql-import-loader' }]
      }
    );

    return config
  }
}