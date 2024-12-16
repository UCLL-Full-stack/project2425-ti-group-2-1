/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: "en",
    locales: ["en", "nl"], // Add your supported locales here
    localeDetection: true,
  },
};

export default nextConfig;
