const apiUrl = process.env.NEXT_PUBLIC_API_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/v1",
      destination: `${apiUrl}/v1`,
    },
    {
      source: "/v1/:endpoint*",
      destination: `${apiUrl}/v1/:endpoint*`,
    },
  ],
  basePath: "/konfigurator",
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
