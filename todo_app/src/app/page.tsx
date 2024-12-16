"use client";
//import styles from "./page.module.css";
import Header from "./components/header/page";
import AddTask from "./components/add_task_button/page";
import ToDoList from "./components/to_do_list/page";
import TaskCount from "./components/task_count/task_count";
import { useAppSelector } from "./redux/hooks";
//import Login from "./components/login/page";
export default function Home() 
{
  const state = useAppSelector((state) => state.task);
  return (
    <>
        <Header />
        <AddTask />
        <ToDoList />
        <TaskCount />
        {/* <Login /> */}
    </>
  );
}
