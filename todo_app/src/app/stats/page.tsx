import React from "react";
import Header from "../components/header/page";
import TaskCount from "../components/task_count/page";
export default function headerPage() 
{
  return (
    <>
      <Header />
      <TaskCount />
    </>
  );
}