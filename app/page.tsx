"use client"

import Link from "next/link";
import Image from "next/image";
import TaskItem from "@/components/TaskItem";
import EmptyState from "@/components/EmptyState";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Task } from "@/types";

export default function Home(){
  const searchParams = useSearchParams();

  const [tasks, setTasks] = useState<Task[]>([
    {id:"abc123", title:"Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.", completed:false,  color:"bg-c-red"},
    {id:"xyz456", title:"Complete project", completed:true, color:"bg-c-yellow"},
    {id:"zzz333", title:"Call mom", completed:false, color:"bg-c-green"},
  ]);

  useEffect(()=>{

    // When the new task creation happens.
    const isNew = searchParams.get("newFlag");

    if(isNew) {
      const id = searchParams.get("id");
      const title = searchParams.get("title");
      const color = searchParams.get("color");
      const completed = searchParams.get("completed") === "true"; // Convert string to boolean
      
      if(id && title && color){
        const newTask:Task = {
          id,
          title,
          completed,
          color,
        }
        setTasks((prevTasks)=>[...prevTasks, newTask]);
      } else {
        console.error("Invalid task Parametes", {id, title, color});
      }
    }

    // When the Edit Task happens
    const storedUpdatedTask = sessionStorage.getItem("updatedTask");

    if(storedUpdatedTask){
      try {
        const updated = JSON.parse(storedUpdatedTask);
        setTasks((prevTasks) => 
          prevTasks.map((task) => 
            task.id === updated.id ? {...task, ...updated} : task
          )
        )
      } catch (error) {
        console.error("Error parsing updatedTask from sessionStorage", error);
      }
    }
  }, [searchParams]);


  const toggleTaskCompletion  = (id:string, completed:boolean) => {
    setTasks((prevTasks)=>
      prevTasks.map((task)=>
        task.id === id ? {...task, completed} : task
      )
    );
  };

  const deleteTask = (id:string) => {
    setTasks((prevTasks)=>prevTasks.filter((task)=>task.id !==id));
  }

  const completedTasks = tasks.filter((task)=>task.completed).length;

  return(
    <>
    <div className="m-auto w-[736px] -mt-10">
      <div className="w-full mb-[66px]">
        <Link href="/tasks/create">
          <button className="rounded-lg h-auto bg-sky-btn pt-4 pb-4 w-full">
            <div className="h-5 flex justify-center items-center">
              <p className="font-inter font-bold text-gray-text mr-2 text-sm">Create Task</p>
              <Image src="/plus.svg" alt="create" width={16} height={16} />
            </div>
          </button>
        </Link>
      </div>
      <div className="mb-6 flex justify-between w-full">
          <div>
            <p className="text-sky-header text-sm">
              Tasks
              <span className="rounded-3xl pt-[2px] pb-[2px] px-2 ml-1 bg-gray-round text-white text-xs">
                {tasks.length}
              </span>
            </p>
          </div>
          <div>
            <p className="text-purple-text text-sm">
              Completed
              <span className="rounded-3xl pt-[2px] pb-[2px] px-2 ml-1 bg-gray-round text-white text-xs">
                {completedTasks} de {tasks.length}
              </span>
            </p>
          </div>
        </div>

      {tasks.length?(
        <>
          {tasks.map((task)=>(
            <TaskItem
              key = {task.id}
              id = {task.id}
              title = {task.title}
              completed = {task.completed}
              color = {task.color}
              onToggle = {toggleTaskCompletion}
              onDelete = {deleteTask}
            />
          ))}
        </>
      ):(
        <EmptyState />
      )}
    
    </div>
    </>
  );
}