import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 设置基础路径为你的仓库名
  basePath: '/react-hooks-and-com',
  // 设置资源前缀
  assetPrefix: 'https://raw.githubusercontent.com/Alex-lp/react-hooks-and-com/refs/heads/main/docs/',
  // 输出到 docs 文件夹
  distDir: 'docs',
};

export default nextConfig;
