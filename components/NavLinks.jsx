import Link from 'next/link'
import React from 'react'

const links = [
    {href : '/chat', label : 'chat'},
    {href : '/profile', label : 'profile'},
]

const NavLinks = () => {
  return (
    <ul className='menu text-base-content'>
        {links.map((link,index)=>{
            return <li key={link.href} className='capitalize'>
                <Link href={link.href}>{link.label}</Link>
                </li>
        })}
    </ul>
  )
}

export default NavLinks