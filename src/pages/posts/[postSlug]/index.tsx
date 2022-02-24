import { getNextStaticProps, is404 } from "@faustjs/next";
import { client, Post } from "client";
import { Footer, Header, Hero } from "components";
import {GetStaticPaths, GetStaticPropsContext} from "next";
import { useRouter } from "next/router";
import React from "react";

export interface PostProps {
  post: Post | Post["preview"]["node"] | null | undefined;
}

export function PostComponent({ post }: PostProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Hero
        title={post?.title()}
        bgImage={post?.featuredImage?.node?.sourceUrl()}
      />

      <main className="content content-single">
        <div className="wrap">
          <div dangerouslySetInnerHTML={{ __html: post?.content() ?? "" }} />
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export default function Page() {
  const { usePost } = client;
  const post = usePost();

  return <PostComponent post={post} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
    return getNextStaticProps(context, {
        Page,
        client,
        notFound: await is404(context, { client }),
    });
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `
                query MyQuery {
                  posts {
                    nodes {
                      slug
                    }
                  }
                }
            `,
        }),
    });
    const json = await res.json();
    const paths = json.data.posts.nodes.map((post) => ({
        params: {
            postSlug: `${post.slug}`
        }
    }))
    return {
        paths,
        fallback: 'blocking',
    };
}
