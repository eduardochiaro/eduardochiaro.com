import React, { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { useTheme } from "next-themes";

export default function ThemeIcon () {
  const [inUseTheme, setInUseTheme] = useState("dark");
  const { systemTheme , theme, setTheme } = useTheme();

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme ;
    setInUseTheme(currentTheme);
  }, [theme, systemTheme])

  return (
    <>
    { inUseTheme === "dark" ? 
      <SunIcon className="w-5 h-5 text-zinc-900 inline-block ml-4 border rounded-full bg-primary-500 " role="button" onClick={() => setTheme('light')} />
      :
      <MoonIcon className="w-5 h-5 text-primary-500 inline-block ml-4 border rounded-full bg-zinc-900" role="button" onClick={() => setTheme('dark')} />
    }
    </>
  )
}