const apiUrl = process.env.NEXT_PUBLIC_API_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/v1",
      destination: "http://3.137.23.97:8000/v1",
    },
    {
      source: "/v1/:endpoint*",
      destination: `http://3.137.23.97:8000/v1/:endpoint*`,
    },
  ],
  basePath: "/configurator",
  swcMinify: true,
  reactStrictMode: false,
  eslint: {
    dirs: ["src", "pages", "styles"],
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
