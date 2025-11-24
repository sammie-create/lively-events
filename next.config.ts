import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        pathname: "/public/**",
      },
    ],
  },

  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;

// import path from "path";
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   webpack(config) {
//     config.resolve.alias["@"] = path.resolve(__dirname, "src");

//     config.module.rules.push({
//       test: /\.svg$/i,
//       issuer: /\.[jt]sx?$/,
//       use: ["@svgr/webpack"],
//     });

//     return config;
//   },
// };

// export default nextConfig;

// import path from "path";
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   experimental: { appDir: true } as any,
//   webpack(config) {
//     config.resolve.alias["@"] = path.resolve(__dirname, "src");

//     config.module.rules.push({
//       test: /\.svg$/i,
//       issuer: /\.[jt]sx?$/,
//       use: ["@svgr/webpack"],
//     });

//     return config;
//   },
// };

// export default nextConfig;
