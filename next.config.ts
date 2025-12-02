import type { NextConfig } from 'next';

// Configuration for using installed npm packages from node_modules

const nextConfig: NextConfig = {
  // Transpile the packages so Next.js can handle them properly
  transpilePackages: ['@legit-sdk/core', '@legit-sdk/react'],

  // Turbopack configuration (Next.js 16 uses Turbopack for builds by default)
  turbopack: {
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
  webpack: (config, { isServer, webpack }) => {

    // Handle TypeScript files with .js extensions in imports
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.jsx': ['.tsx', '.jsx'],
    };

    // Ensure TypeScript files are handled correctly
    config.resolve.extensions = ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'];

    // Handle node: protocol imports - must be done before other plugins
    config.plugins = config.plugins || [];

    // Replace node: protocol imports with regular imports
    // This needs to happen early in the resolution process
    config.plugins.unshift(
      new webpack.NormalModuleReplacementPlugin(
        /^node:/,
        (resource: { request: string }) => {
          resource.request = resource.request.replace(/^node:/, '');
        }
      )
    );

    // Handle Node.js built-in modules (for client-side code)
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: false,
        fs: false,
        path: false,
        stream: false,
        crypto: false,
        util: false,
        events: false,
        http: false,
        https: false,
        url: false,
        querystring: false,
      };
    }

    return config;
  },
};

export default nextConfig;
