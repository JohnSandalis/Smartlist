import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["jupauipnbrehbvjmtxkk.supabase.co"],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
