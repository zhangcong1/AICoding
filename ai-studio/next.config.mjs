/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 本地静态头像无需优化，直出 /public 资源，避免 dev 下优化器卡死
  images: { unoptimized: true },
};

export default nextConfig;
