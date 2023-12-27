"use client"
import React, { useEffect, useState, ChangeEvent } from 'react';
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";


export default function NavBar() {
  const initialTheme = (typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : 'emerald') as string;
  const [theme, setTheme] = useState<string>(initialTheme);

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? 'forest' : 'emerald');
  };

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme);
      const localTheme = localStorage.getItem('theme') || 'emerald';
      document.querySelector('html')?.setAttribute('data-theme', localTheme);
    }
  }, [theme]);

  const isChecked = theme === 'forest';
  const {user, isLoaded} = useUser()
  return (
    <div className="navbar bg-primary text-primary-content rounded-2xl mt-10">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">
          Wind Tool
        </a>
      </div>
      <input
        type="checkbox"
        onChange={handleToggle}
        checked={isChecked}
        value="synthwave"
        className="toggle theme-controller mr-4"
      />
        {
            isLoaded && user && (
            <>
                <UserButton afterSignOutUrl="/"></UserButton>
            </>
        )}
    </div>
  );
}
