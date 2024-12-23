"use client"

import Image from "next/image"
import Link from "next/link"
import ColorPicker from "@/components/ColorPicker"
import { updateTasks } from "@/utils/api"
import { Task } from "@/types"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import React from "react"

export default function UpdateTask({ params } : { params:Promise<{ id:string }> }){
  const router = useRouter();
  const searchParams = useSearchParams();

  const o_title = searchParams.get('title');
  const o_color = searchParams.get('color') || '';
  const o_completed = searchParams.get('completed');

  const [title, setTaskTitle] = useState(o_title);
  const [color, setTaskColor] = useState<string | null> (null);
  const [id, setTaskId] = useState<string | null> (null);
  
  useEffect(() => {
    const fetchParams = async () => {
      const { id } = await params;
      setTaskId(id);
    }

    setTaskTitle(o_title || "");
    setTaskColor(o_color || "bg-c-red");

    fetchParams();
  }, [params, o_title, o_color]);

  if(!id) return <p>Loading...</p>

  const handleSaveTask = async () => {
    if(!title || !color){
      alert("Please enter a title and select a color.");
      return;
    }

    let updatedTask: Task;
    const response = await updateTasks({id, title, color})
    if(response.success){
      updatedTask = response.data;
      sessionStorage.setItem("updatedTask", JSON.stringify(updatedTask));
    }
    else{
      return;
    }

    router.push("/");
  }

  return(
    <>
      <div className="m-auto max-w-screen-sm md:max-w-screen-md lg:w-[736px] mt-5 md:mt-12">
        <div className="w-full mb-12">
          <Link href= "/">
            <button className="p-[5px]">
              <Image src="/left.svg" alt="left" width={14} height={14} />
            </button>
          </Link>
        </div>
        <div className="grid w-full">
          <div className="w-full">
            <label className="text-sm text-sky-header float-left">
              Title
            </label>
            <input className="mt-3 p-4 w-full min-h-[52px] border-[1px] border-gray-round rounded-lg bg-task-color text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500" 
              placeholder="Ex. Brush your teeth" 
              type="text" 
              name="title"
              value={title || ""}
              onChange={(e)=>setTaskTitle(e.target.value)}
            />
          </div>
          <div className="mt-6 w-full">
            <label className="text-sm text-sky-header float-left">
              Color
            </label>
          </div>
            
          <div className="mt-3 float-left w-full">
            <ColorPicker
              initialColor={color}
              onColorChange={(color)=>setTaskColor(color)} />
          </div>
          <div className="mt-12 w-full">
            <button className="rounded-lg h-auto bg-sky-btn pt-4 pb-4 w-full" onClick={handleSaveTask}>
              <div className="h-5 flex justify-center items-center">
                <p className="font-inter font-bold text-gray-text mr-2 text-sm">Save</p>
                <Image src="/Vector.svg" alt="create" width={16} height={16} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}