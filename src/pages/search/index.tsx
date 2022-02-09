import { client } from 'client'
import { Footer, Header, Pagination, Posts } from 'components'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import styles from 'scss/pages/posts.module.scss'

const POSTS_PER_PAGE = 100

export default function Page() {
  const { query } = useRouter()
  const { postSlug, postCursor } = query
  const { usePosts, useQuery } = client
  const generalSettings = useQuery().generalSettings
  const isBefore = postSlug === 'before'
  const posts = usePosts({
    after: !isBefore ? (postCursor as string) : undefined,
    before: isBefore ? (postCursor as string) : undefined,
    first: !isBefore ? POSTS_PER_PAGE : undefined,
    last: isBefore ? POSTS_PER_PAGE : undefined,
    where: { search: query.s ? (query.s as string) : undefined },
  })

  if (useQuery().$state.isLoading) {
    return null
  }

  return (
    <>
      <Header
          title={generalSettings.title}
          description={generalSettings.description}
      />

      <Head>
        <title>
          {generalSettings.title} - {generalSettings.description}
        </title>
      </Head>

      <main className="content content-index">
        <Posts
          posts={posts.nodes}
          heading={`Search Result for "${query.s}"`}
          headingLevel="h2"
          postTitleLevel="h3"
          id={styles.post_list}
        />
        <Pagination pageInfo={posts.pageInfo} basePath="/posts" />
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  )
}
