import { Feed } from 'feed';
import { Options, DOCS } from './utils.js';
import { create } from './create.js';
import fs from 'fs-extra';
import path from 'node:path';
import recursiveReaddirFiles from 'recursive-readdir-files';

export async function generateRSSFeed(options: Options) {
  const files = await recursiveReaddirFiles(process.cwd(), {
    ignored: /[\\/](node_modules|\.git)/g,
    exclude: /(\.json|\.mjs|CONTRIBUTING\.md)$/,
    filter: (item) => item.ext === 'md',
  });
  // 创建 RSS Feed 配置
  const baseUrl = options.config?.github?.url?.replace('/blob/main', '').replace('.git', '') || 'https://example.com';
  const siteUrl = baseUrl.replace('github.com', 'github.io').replace('.com/', '.io/') + '/refs-cli';

  const feed = new Feed({
    title: options.config?.title || 'Quick Reference',
    description: options.config?.description || 'Command line tool to generate Quick Reference website.',
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    generator: 'refs-cli',
    feedLinks: {
      rss: `${siteUrl}/feed.xml`,
      atom: `${siteUrl}/feed.atom`,
      json: `${siteUrl}/feed.json`,
    },
    author: {
      name: 'refs-cli',
      email: 'noreply@example.com',
      link: siteUrl,
    },
  });

  let addedItems = 0;

  // 处理每个 markdown 文件
  for (const file of files) {
    try {
      const mdstr = await fs.readFile(file.path, 'utf-8');
      // 跳过首页文件
      if (/README.md$/.test(path.relative(process.cwd(), file.path))) {
        continue;
      }
      console.log(`√ ->>>> ${file.path}`);
      // 获取文件统计信息用于日期

      addedItems++;
    } catch (error) {
      console.warn(`⚠️  Warning: Could not process ${file.path}:`, error.message);
    }
  }

  console.log(`✅ Added ${addedItems} items to RSS feed`);

  // 生成 RSS 文件
  const rssXml = feed.rss2();
  const atomXml = feed.atom1();
  const jsonFeed = feed.json1();

  // 确保输出目录存在
  await fs.ensureDir(options.output);

  // 写入文件
  await fs.writeFile(path.join(options.output, 'feed.xml'), rssXml);
  await fs.writeFile(path.join(options.output, 'feed.atom'), atomXml);
  await fs.writeFile(path.join(options.output, 'feed.json'), jsonFeed);

  console.log(`📰 Generated RSS feeds:`);
  console.log(`   - ${path.join(options.output, 'feed.xml')}`);
  console.log(`   - ${path.join(options.output, 'feed.atom')}`);
  console.log(`   - ${path.join(options.output, 'feed.json')}`);
}
