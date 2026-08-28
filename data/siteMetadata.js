/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: "wangchaoqi's Blog",
  author: 'wangchaoqi',
  headerTitle: "wangchaoqi's Blog",
  description: '技术学习笔记、随笔。',
  language: 'zh-CN',
  theme: 'light', // 已移除深色模式，统一浅色
  // 部署后替换成你的真实域名,如 https://your-domain.com
  siteUrl: 'https://example.com',
  siteRepo: 'https://github.com/【TODO: 用户名】/【TODO: 仓库名】',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  // 社交链接：填上对应字段才会在页脚显示图标，留空自动隐藏
  email: 'wangchoaq_jp@163.com', // 【TODO: 你的邮箱】
  github: 'https://github.com/W200111', // 【TODO: https://github.com/你的用户名】
  // 其他平台按需取消注释并填写，例如：
  // x: 'https://twitter.com/你的用户名',
  // linkedin: 'https://www.linkedin.com/in/你的用户名',
  // weibo / zhihu / bilibili 等可自行在 components/social-icons 扩展
  locale: 'zh-CN',
  // 顶部导航栏固定 + 毛玻璃效果
  stickyNav: true,
  // 分析/评论/邮件订阅：暂未接入，留空不渲染
  analytics: {},
  newsletter: {
    provider: ''
  },
  comments: {
    provider: ''
  },
  search: {
    provider: 'kbar', // kbar 或 algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`
    }
  }
}

module.exports = siteMetadata
