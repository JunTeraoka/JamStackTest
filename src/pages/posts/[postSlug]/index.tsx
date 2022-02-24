import { getNextStaticProps, is404 } from "@faustjs/next";
import { client, Post } from "client";
import { Footer, Header, Hero } from "components";
import { GetStaticPropsContext } from "next";
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

export function getStaticPaths() {
    return {
        paths: [],
        fallback: "blocking",
    };
}
