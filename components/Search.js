import { useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/Search.module.css";

const Search = () => {
  const [term, setTerm] = useState("");

  const router = useRouter();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm("");
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={term} onChange={(evt) => setTerm(evt.target.value)} placeholder="Search events" />
      </form>
    </div>
  );
};

export default Search;
