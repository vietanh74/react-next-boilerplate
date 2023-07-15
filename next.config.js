/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  poweredByHeader: false,
  distDir: 'dist',
  reactStrictMode: false,
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
      preventFullImport: true,
    },
  },
};
