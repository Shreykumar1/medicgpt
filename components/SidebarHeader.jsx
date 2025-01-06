import { SiOpenaigym } from 'react-icons/si';
import ThemeToggle from './ThemeToggle';
import { FaBookMedical } from "react-icons/fa";

const SidebarHeader = () => {
  return (
    <div className='flex items-center mb-4 gap-2 md:gap-4 md:px-4 '>
      <FaBookMedical className='w-10 h-10 text-primary' />
      <h2 className='text-xl font-extrabold text-primary md:mr-auto'>MedicGPT</h2>
      <ThemeToggle />
    </div>
  )
}

export default SidebarHeader