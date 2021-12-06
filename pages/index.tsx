import styles from '../src/styles/home.module.scss'
import Head from 'next/head'

const Home = () => {
  return (
    <>
    <Head>
      <title>Home - ig.news</title>
    </Head>
    <h1 className={styles.title}>Hello World</h1>
    </>
  )
}

export default Home