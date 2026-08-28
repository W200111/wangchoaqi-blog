import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors | undefined
  if (!author) {
    throw new Error(
      `About 页找不到 slug 为 "default" 的作者。allAuthors 现有 slug: [${allAuthors
        .map((a) => a.slug)
        .join(', ')}]。请确认 data/authors/default.mdx 存在且 frontmatter 合法(name 必填), 并清除 .contentlayer 缓存后重启 dev。`
    )
  }
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
