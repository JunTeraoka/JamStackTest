import { getNextStaticProps } from '@faustjs/next'

import { GetStaticPropsContext } from 'next'
import Link from 'next/link'
import React from 'react'
import { CTA, Footer, Header, Hero, Posts } from 'components'
import styles from 'scss/pages/home.module.scss'
import { client } from 'client'

export default function Page() {
  const { usePosts, useQuery } = client
  const generalSettings = useQuery().generalSettings
  const posts = usePosts({
    first: 6
  })

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <main className="content">
        <Posts
          posts={posts.nodes}
          heading="Latest Posts"
          intro="The Posts component in src/pages/index.tsx shows the latest six posts from the connected WordPress site."
          headingLevel="h2"
          postTitleLevel="h3"
          id={styles.post_list}
        />
        <Link href="/posts">
            <a>
                All posts
            </a>
        </Link>
      </main>
      <Footer copyrightHolder={generalSettings.title} />
    </>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  })
}
