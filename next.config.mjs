/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
  },

  //   images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http',
  //       hostname: 'localhost',
  //       port: '4000',
  //       pathname: '/assets/**',
  //     },
  //   ],
  // },
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-be-parking.evosist.com',
        pathname: '/assets/**',
      },
    ],
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        ...config.resolve.fallback,
      };
    }
    return config;
  },
};

export default nextConfig;
