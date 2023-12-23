import Link from "next/link";
import styles from "./styles.module.scss";

export default function Ad() {
  return (
    <Link href="/">
      <div className={styles.ad}></div>
    </Link>
  );
}
