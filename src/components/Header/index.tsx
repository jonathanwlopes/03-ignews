import { SignInButton } from "../SignInButton"
import styles from "./styles.module.scss"
import { useRouter } from "next/router"
import { ActiveLink } from "./ActiveLink"

export const Header = () => {
  const { asPath } = useRouter()

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink href="/" activeClass={styles.active}>
            <a>Home</a>
          </ActiveLink>

          <ActiveLink href="/posts" activeClass={styles.active} prefetch>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}
