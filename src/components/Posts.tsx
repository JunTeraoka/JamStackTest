import React from 'react'
import Link from 'next/link'
import type { Post } from 'client'
import styles from 'scss/components/Posts.module.scss'
import Heading, { HeadingProps } from './Heading'
import Image from 'next/image'

interface Props {
  posts: Post[] | undefined
  intro?: string
  id?: string
  heading?: string
  headingLevel?: HeadingProps['level']
  postTitleLevel?: HeadingProps['level']
  readMoreText?: string
}

function Posts({
  posts,
  intro,
  heading,
  id,
  headingLevel = 'h1',
  postTitleLevel = 'h2',
  readMoreText = 'Read more',
}: Props): JSX.Element {
  console.log(posts)
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section className={styles['posts-block']} {...(id && { id })}>
      <div className="wrap">
        {heading && (
          <Heading level={headingLevel} className={styles.heading}>
            {heading}
          </Heading>
        )}
        {intro && <p className={styles.intro}>{intro}</p>}
        <div className="posts">
          {posts.map((post) => (
            <div
              className={styles.single}
              key={post.id ?? ''}
              id={`post-${post.id}`}
            >
              {post.featuredImage.node.sourceUrl() ? (
                <Link href={`/posts/${post.slug}`}>
                  <a>
                    <Image
                      src={post?.featuredImage?.node?.sourceUrl()}
                      width={1280}
                      height={720}
                      alt="画像"
                    />
                  </a>
                </Link>
              ) : (
                <></>
              )}
              <div>
                <Heading level={postTitleLevel} className={styles.title}>
                  <Link href={`/posts/${post.slug}`}>
                    <a>{post.title()}</a>
                  </Link>
                </Heading>
              </div>
            </div>
          ))}
          {posts && posts?.length < 1 && <p>No posts found.</p>}
        </div>
      </div>
    </section>
  )
}

export default Posts
