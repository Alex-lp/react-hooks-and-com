import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 输出到 docs 文件夹
  distDir: 'docs',
  // 根路径部署
  assetPrefix: '',
  basePath: '',
};

export default nextConfig;
