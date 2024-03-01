/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const path = require("path");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
    disable: process.env.NODE_ENV === "development"
  },
  reactStrictMode: true,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  swcMinify: true,
  compress: true,
  optimizeFonts: true,
  devIndicators: {
    autoPrerender: false,
    buildActivityPosition: "bottom-right"
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  env: {
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
    NEXT_CLIENT_ID: process.env.NEXT_CLIENT_ID,
    NEXT_CLIENT_SECRET: process.env.NEXT_CLIENT_SECRET,
    NEXT_REDIRECT_URI: process.env.NEXT_REDIRECT_URI,
    NEXT_REDIRECT_SUCCESS_URI: process.env.NEXT_REDIRECT_SUCCESS_URI,
    NEXT_GOOGLE_CLIENT_ID: process.env.NEXT_GOOGLE_CLIENT_ID,
    NEXT_GOOGLE_CLIENT_SECRET: process.env.NEXT_GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_APP_SPOTIFY_BASE_URL: process.env.NEXT_APP_SPOTIFY_BASE_URL,
    NEXT_APP_YOUTUBE_BASE_URL: process.env.NEXT_APP_YOUTUBE_BASE_URL
  },
  typescript: { ignoreBuildErrors: false }
});
