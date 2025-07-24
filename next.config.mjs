// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'standalone',
//   experimental: {
//     // serverActions: true,
//     serverActions: {},
//   },
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         fs: false,
//         net: false,
//         tls: false,
//         child_process: false,
//         ...config.resolve.fallback,
//       };
//     }

//     return config;
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
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
