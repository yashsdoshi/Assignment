import styles from "./page.module.css";
import Header from "./components/header/page";
import Sidebar from "./components/sidebar/sidebar";
import Dashboard from "./dashboard/page";
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <Sidebar />
        <Dashboard />
      </main>
    </div>
  );
}
