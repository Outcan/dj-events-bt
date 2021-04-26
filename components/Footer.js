import Link from "next/link";
import styles from "@/styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ Events {new Date().getFullYear()}.</p>
      <p>
        <Link href="/about">
          <a>About this project.</a>
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
