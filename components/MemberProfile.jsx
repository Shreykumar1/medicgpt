"use client"
import { UserButton} from '@clerk/nextjs';
import {  currentUser, auth } from '@clerk/nextjs/server';
import { useState, useEffect } from 'react';
const MemberProfile =  () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await currentUser();
      setUser(user);
    };
    fetchUser();
  }, []);
  return (
    <div className='px-4 flex items-center gap-2'>
      <UserButton afterSignOutUrl='/' />
      <p className='text-xs md:text-base'>{user?.emailAddresses[0]?.emailAddress}</p>
    </div>
  );
};
export default MemberProfile;