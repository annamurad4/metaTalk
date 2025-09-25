/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performans optimizasyonları
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // Sayfa geçişlerini hızlandırmak için
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  }
};

module.exports = nextConfig;
