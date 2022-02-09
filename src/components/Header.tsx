import React, {useEffect} from "react";
import styles from "scss/components/Header.module.scss";
import Link from "next/link";
import { client, MenuLocationEnum } from "client";
import SearchForm from "./SearchForm";

interface Props {
  title?: string;
  description?: string;
}

function Header({
  title = "Headless by WP Engine",
  description,
}: Props): JSX.Element {
  const categories = client.useQuery().categories();

  return (
    <header>
      <div className={styles.wrap}>
        <div className={styles["title-wrap"]}>
          <p className={styles["site-title"]}>
            <Link href="/">
              <a>{title}</a>
            </Link>
          </p>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <div className={styles.menu}>
          <ul>
            {categories.nodes.map((category) => (
              <li key={`${category.id}$-menu`}>
                <Link href={`/category/${category.slug}`}>
                  <a href={`/category/${category.slug}`}>{category.name}</a>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles["right-group"]}>
            <Link href="https://github.com/JunTeraoka/JamStackTest">
              <a className="button">
                GitHub
              </a>
            </Link>
            <SearchForm />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
