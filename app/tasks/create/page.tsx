"use client"

import Image from "next/image"
import Link from "next/link"
import { Task } from "@/types"
import { createTasks } from "@/utils/api"
import ColorPicker from "@/components/ColorPicker"
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function CreateTask(){
  const router = useRouter();

  const [title, setTaskTitle] = useState('');
  const [color, setTaskColor] = useState<string | null> (null);

  const handleCreateTask = async() => {
    if(!title || !color){
      alert("Please enter a title and select a color.");
      return;
    }

    let newTask : Task;

    const response = await createTasks({title, color});
    if(response.success){
      newTask = response.data;
      router.push(`/?newFlag=true&id=${newTask.id}&title=${newTask.title}&color=${newTask.color}&completed=${newTask.completed}`);
    }
    else{
      return;
    }    
  }

  return(
    <>
      <div className="m-auto w-[736] mt-[91]">
        <div className="float-left w-full">
          <Link href= "/">
            <button className="p-[5px]">
              <Image src="/left.svg" alt="left" width={14} height={14} />
            </button>
          </Link>
        </div>
        <div className="pt-12 grid w-full">
          <div className="w-full">
            <label className="text-sm text-sky-header float-left">
              Title
            </label>
            <input className="mt-3 p-4 w-full min-h-[52px] border-[1px] border-gray-round rounded-lg bg-task-color text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500" 
              placeholder="Ex. Brush your teeth" 
              type="text" 
              name="title" 
              onChange={(e)=>setTaskTitle(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <label className="text-sm text-sky-header float-left">
              Color
            </label>
          </div>
            
          <div className="mt-3 float-left">
            <ColorPicker
              onColorChange={(color)=>setTaskColor(color)} />
          </div>
          <div className="mt-12">
            <button className="rounded-lg h-auto bg-sky-btn pt-4 pb-4 w-full" onClick={handleCreateTask}>
              <div className="h-5 flex justify-center items-center">
                <p className="font-inter font-bold text-gray-text mr-2 text-sm">Add Task</p>
                <Image src="/plus.svg" alt="create" width={16} height={16} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}