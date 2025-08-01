import createMDX from "@next/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Jest worker 문제 해결을 위한 설정
    workerThreads: false,
    cpus: 1,
  },
  // 빌드 시 외부 의존성 처리
  serverComponentsExternalPackages: ['@prisma/client'],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkToc, remarkGfm, remarkBreaks],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
    providerImportSource: "@mdx-js/react",
  },
});

module.exports = withMDX(nextConfig);
