/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['painel.mayacomunicacao.com.br']
  }
};

module.exports = nextConfig;
