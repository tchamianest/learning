"use client";
import React, { useEffect, useState } from "react";

const DarkMode = () => {
  const [theme, setTheme] = useState<string>("light");
  useEffect(() => {
    const savedTheme = localStorage?.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const element = document.documentElement; 
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [theme]);

  return (
    <div className="relative">
      <img
        src="./dark-mode-button.png"
        alt=""
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={`w-12 absolute dark:block right-0 z-10 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] translation-all duration-300 ${
          theme === "dark" ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src="./light-mode-button.png"
        alt=""
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] translation-all duration-300 "
      />
    </div>
  );
};

export default DarkMode;
