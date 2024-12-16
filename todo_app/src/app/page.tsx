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
          flexDirection: "row", // Keeps the items in a row
          flexWrap: "wrap", // Allows items to wrap to the next row if necessary
          justifyContent: "flex-start", // Aligns items to the left (optional)
          padding: "10px",
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
