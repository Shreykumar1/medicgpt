import React from 'react'
import SidebarHeader from './SidebarHeader'
import NavLinks from './NavLinks'
import MemberProfile from './MemberProfile'

const Sidebar = () => {
  return (
    <div className="px-4 w-60 md:w-80 min-h-full py-12 bg-base-300 text-base-content grid grid-rows-[auto,1fr,auto]">
        <SidebarHeader />
        <NavLinks />
        {/* <MemberProfile /> */}
    </div>
  )
}

export default Sidebar