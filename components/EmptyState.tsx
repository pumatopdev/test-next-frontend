import React from "react";
import Image from "next/image";

const EmptyState:React.FC = () => {
  return(
    <>
      <div className="grid justify-items-center mt-6 h-auto w-full pt-16 pb-16 border-t-2 rounded-md border-gray-800">
        <div className="mt-16">
          <Image src="/Clipboard.svg" alt="Clipboard" width={56} height={56} />
        </div>
        <div className="mt-4 px-6">
          <p className="text-base font-bold text-center text-gray2-text">
            You don't have any tasks registered yet.
            <br></br><br></br>
            <span className="font-normal">
              Create tasks and organize your to-do items.
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default EmptyState;