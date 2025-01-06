'use client'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'
import { useState } from "react"

const themes = {
  winter : 'winter',
  dracula : 'dracula'
}

const ThemeToggle = () => {
  const [theme,setTheme] = useState(themes.winter);
  function toggleTheme() {
    const newTheme = theme === themes.winter ? themes.dracula : themes.winter;
    document.documentElement.setAttribute('data-theme',newTheme);
    setTheme(newTheme)
  }
  return (
    <button className='btn btn-outline btn-sm' onClick={toggleTheme}>
      {theme === 'winter'?<BsMoonFill className='w-4 h-4'/>:<BsSunFill className='w-4 h-4'/>}
      </button>
  )
}

export default ThemeToggle