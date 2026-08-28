'use client'

import { useRef } from 'react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Typewriter from '@/components/Typewriter'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

function ScrollDownArrow({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="向下滚动查看文章"
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 transition-colors hover:text-primary-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-bounce"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  )
}

export default function Home({ posts }) {
  const postsRef = useRef<HTMLDivElement>(null)
  const scrollToPosts = () => postsRef.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      {/* 首屏：只保留一行打字机诗句，占满视口，底部有向下箭头 */}
      <section className="relative flex h-screen flex-col items-center justify-center px-4">
        <h1 className="sr-only">{siteMetadata.headerTitle}</h1>
        <p className="font-display text-ink text-center text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl">
          <Typewriter />
        </p>
        <ScrollDownArrow onClick={scrollToPosts} />
      </section>

      {/* 文章列表：滚动或点击箭头后到达 */}
      <div ref={postsRef} id="posts" className="min-h-screen scroll-mt-16 pt-16">
        <div className="border-t border-gray-200">
          <div className="pt-12 pb-2">
            <h2 className="text-sm font-medium tracking-widest text-gray-400 uppercase">Latest</h2>
          </div>
          <ul className="divide-y divide-gray-200">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags, readingTime } = post
              return (
                <li key={slug} className="py-10">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-sm leading-6 text-gray-500">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                          {readingTime?.minutes && (
                            <>
                              <span className="mx-2">·</span>
                              {Math.max(1, Math.round(readingTime.minutes))} min read
                            </>
                          )}
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-display text-2xl leading-8 font-medium tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="hover:text-primary-600 text-ink transition-colors"
                              >
                                {title}
                              </Link>
                            </h3>
                            <div className="mt-2 flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500">{summary}</div>
                        </div>
                        <div className="text-base leading-6 font-medium">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-primary-500 hover:text-primary-600"
                            aria-label={`Read more: "${title}"`}
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end pt-6 text-base leading-6 font-medium">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600"
              aria-label="All posts"
            >
              All Posts &rarr;
            </Link>
          </div>
        )}
        {siteMetadata.newsletter?.provider && (
          <div className="flex items-center justify-center pt-4">
            <NewsletterForm />
          </div>
        )}
      </div>
    </>
  )
}
