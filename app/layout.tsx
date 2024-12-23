import React from "react";
import "./globals.css";
import Image from "next/image";

export const metadata = {
  title: "Todo App",
  description: "Jonathan Hou",
};

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-base-color font-inter">
        <header className="bg-header-color">
          <div className="max-w-full h-[200px] flex justify-center">
            <div className="w-[226px] h-[48px] pt-[72px] flex justify-between">
              <div className="mt-[15px] mr-[2px]">
                <Image src="/rocket.svg" width={22} height={36} alt="icon"/>
              </div>
              <div>
                <p className="text-[40px] font-black text-sky-header">
                  Todo <span className="text-purple-header">App</span>
                </p>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-full mx-auto p-[14px]">
          {children}
        </main>
      </body>
    </html>
  );
}

