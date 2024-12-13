import styles from "./page.module.css";
import Header from "./components/header/page";
import Sidebar from "./components/sidebar/page";
import Dashboard from "./dashboard/page";
//import Login from "./components/login/page";
export default function Home() 
{
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <Sidebar />
        <Dashboard />
        {/* <Login /> */}
      </main>
    </div>
  );
}
