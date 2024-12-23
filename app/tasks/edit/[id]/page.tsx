"use client"

import Image from "next/image"
import Link from "next/link"
import ColorPicker from "@/components/ColorPicker"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import React from "react"

export default function UpdateTask({ params } : { params:Promise<{ id:string }> }){
  const router = useRouter();
  const searchParams = useSearchParams();

  const title = searchParams.get('title');
  const color = searchParams.get('color') || '';
  const completed = searchParams.get('completed');

  const [taskTitle, setTaskTitle] = useState(title);
  const [taskColor, setTaskColor] = useState<string | null> (null);
  const [taskId, setTaskId] = useState<string | null> (null);
  
  useEffect(() => {
    const fetchParams = async () => {
      const { id } = await params;
      setTaskId(id);
    }

    setTaskTitle(title || "");
    setTaskColor(color || "bg-c-red");

    fetchParams();
  }, [params, title, color]);

  if(!taskId) return <p>Loading...</p>

  const handleSaveTask = () => {
    if(!taskTitle || !taskColor){
      alert("Please enter a title and select a color.");
      return;
    }

    const updatedTask = {
      id: taskId,
      title: taskTitle,
      completed: completed,
      color: taskColor,
    };

    sessionStorage.setItem("updatedTask", JSON.stringify(updatedTask));

    router.push("/");
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
              value={taskTitle || ""}
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
              initialColor={taskColor}
              onColorChange={(color)=>setTaskColor(color)} />
          </div>
          <div className="mt-12">
            <button className="rounded-lg h-auto bg-sky-btn pt-4 pb-4 w-full" onClick={handleSaveTask}>
              <div className="h-5 flex justify-center items-center">
                <p className="font-inter font-bold text-gray-text mr-2 text-sm">Save</p>
                <Image src="/plus.svg" alt="create" width={16} height={16} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}