import styles from "./Header.module.css";
import logoImage from "../../assets/logo.svg";
export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src={logoImage} alt="TODO - Logo" />
      </div>
    </header>
  );
}
