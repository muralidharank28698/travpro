import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* Disable Turbopack to avoid intermittent panic errors */
};

export default withNextIntl(nextConfig);

