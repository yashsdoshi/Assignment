"use client";
//import styles from "./page.module.css";
import Header from "./components/header/page";
import AddTask from "./components/add_task_button/page";
import ToDoList from "./components/to_do_list/page";
import { useAppSelector } from "./redux/hooks";
//import Login from "./components/login/page";

export default function Home() {
  const state = useAppSelector((state) => state.task);
  return (
    <>
      <Header />
      <AddTask />
      <div
        style={{
          display: "flex",
          flexDirection: "row", 
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        <ToDoList />
        <ToDoList />
        <ToDoList />
        <ToDoList />
        <ToDoList />
      </div>
      {/* <Login /> */}
    </>
  );
}
