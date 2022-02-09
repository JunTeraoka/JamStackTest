import React, {useState} from 'react';
import {useRouter} from "next/router";
import styles from "scss/components/SearchForm.module.scss";

const SearchForm: React.VFC = () => {
  const [query, setQuery] = useState<string>(null);
  const router = useRouter();

  const searchPosts = (e) => {
    e.preventDefault()
    router.push({
      pathname: "/posts",
      query: {s: query}
    })
  }

  return (
      <form className={styles["search-form"]} onSubmit={searchPosts}>
        <input
            value={query}
            placeholder="検索キーワード"
            onChange={(e) => {setQuery(e.target.value)}}
        />
      </form>
  );
}

export default SearchForm;
