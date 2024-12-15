"use client";
//import styles from "./page.module.css";
import Header from "./components/header/page";
import AddTask from "./components/add_task_button/page";
import ToDoList from "./components/to_do_list/page";
import { useAppSelector } from "./redux/hooks";
//import Login from "./components/login/page";
export default function Home() 
{
  const state = useAppSelector((state) => state.task);
  return (
    <div>
      <main>
        <Header />
        <AddTask />
        <ToDoList />
        {/* <Login /> */}
      </main>
    </div>
  );
}
