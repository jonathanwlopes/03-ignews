import { GetStaticPaths, GetStaticProps } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { RichText } from "prismic-dom"
import { useEffect } from "react"
import { getPrismicClient } from "../../../src/services/prismic"

import styles from "../post.module.scss"

interface PreviewPostProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

export default function Post({ post }: PreviewPostProps) {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session, router, post.slug])

  return (
    <>
      <Head>
        <title> {post.title} | Ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div className={`${styles.postContent} ${styles.previewContent}`} dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
        <div className={styles.continueReading}>
          Wanna continue reading?
          <Link href="/">
            <a> Subscribe now 🧐</a>
          </Link>
        </div>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: "dark-mode-com-css--mudando-a-aparencia-do-blog-de",
        },
      },
    ],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const prismic = getPrismicClient()

  const response = await prismic.getByUID<PreviewPostProps["post"]>("post", String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.slice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }

  return {
    props: {
      post,
    },

    redirect: 60 * 30, // 30 Minutos
  }
}
