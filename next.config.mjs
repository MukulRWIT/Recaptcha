/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    SITE_RECAPTCHA_SECRET: process.env.SITE_RECAPTCHA_SECRET,
  },
};

export default nextConfig;
