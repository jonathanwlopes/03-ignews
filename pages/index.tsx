import { GetStaticProps } from "next"
import { stripe } from "../src/services/stripe"

import Head from "next/head"
import styles from "./home.module.scss"
import { FaHandsWash } from "react-icons/fa"
import { SubscribeButton } from "../src/components/SubscribeButton"

interface HomeProps {
  product: {
    priceId: string;
    amount: number
  }
}
export default function Home({ product }: HomeProps) {
  console.log(product)
  return (
    <>
      <Head>
        <title>Home - ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>
            <FaHandsWash /> Hey, welcome
          </span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all publications <br />
            <span>for ${product.amount} month</span>
          </p>

          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1K4OMkIBDUw6hwXTRmydilTb", {
    expand: ["product"],
  })

  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100,
  }

  return {
    props: {
      product,
    },

    revalidate: 60 * 60 * 24 // 24 hours
  }
}
