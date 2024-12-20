"use client";
import Header from "./components/header/page";
import AddTask from "./components/add_task_button/page";
import ToDoList from "./components/to_do_list/to_do_list";
import { useAppSelector } from "./redux/hooks";
//import Login from "./components/login/page";

export default function Home() {
  const lists = useAppSelector((state) => state.task.lists);

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
        {lists.map((list) => (
          <ToDoList key={list.id} toDoList={list} />
        ))}
      </div>
      {/* <Login /> */}
    </>
  );
}