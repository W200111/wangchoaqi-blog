# 项目长期记忆 — tailwind-nextjs-starter-blog

## 项目概况
- timlrx/tailwind-nextjs-starter-blog v2.4,Next.js 15 App Router + Tailwind CSS v4(CSS-first 配置在 `css/tailwind.css` 的 `@theme`,无 tailwind.config.js)+ contentlayer2。
- UI 风格方向(2026-08-28 下午定):**Claude 官网风** — 暖米白 #FAF9F5 底 + 赤陶橙 #D97757 强调色 + 正文无衬线(Inter + Noto Sans SC)/标题衬线(Lora + Noto Serif SC,`font-display` 类),首页居中 Hero + 历史诗句打字机(components/Typewriter.tsx),深色模式已移除(forcedTheme=light)。第一轮曾做"朱砂+宋体正文"极简风,已被本轮覆盖。

## Windows 本机构建要点(踩坑记录)
- 系统无全局 yarn/node;用托管 node:`export PATH="/c/Users/zhou/.workbuddy/binaries/node/versions/22.22.2:$PATH"`,然后用 npm/npx。
- **不要**在 Git Bash 里跑 `npm run build`:脚本里 `cross-env INIT_CWD=$PWD` 会把 POSIX 路径 `/d/CODE/...` 传给 contentlayer,导致 `NoConfigFoundError`。直接 `npx next build` 绕过,或用 yarn(yarn 自动设置正确的 INIT_CWD)。
- WorkBuddy 沙箱 safe-delete 守卫:单轮会话内 node 进程删除文件累计 >50 个即拦截,`next build`/`next dev` 清理 `.next` 时会被杀。解决办法:手动 `rm -rf .next`(需审批)后再构建;守卫计数是"每轮会话"累计,超阈值的当轮基本无法再跑构建,改下一轮再试,或用 `npx tsc --noEmit` 做无副作用验证。

## 约定与坑
- **mdx frontmatter 的 TODO/占位值必须用引号包裹**。未加引号的标量若含 `: `(冒号+空格,如 `【TODO: 你的昵称】`)会被 YAML 当成键值对,整段 frontmatter 解析错乱,contentlayer 直接丢弃该文档(表现为 About 页 `author.body` undefined)。`siteMetadata.js` 是 JS 对象不受此限。
