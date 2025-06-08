import { MdLogout } from "react-icons/md"
import { useNavigate } from "react-router-dom"

function Header() {
  const navigate = useNavigate()
  function handleLogout() {
    localStorage.clear()
    navigate('/')
  } 
  return (
    <div className="px-5 md:px-10 py-[20px] bg-[#fff]">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center ">
            <div className="flex items-center gap-[10px]">
                <button className="py-[3px] px-[5px] rounded-[5px] text-[#fff] bg-[blue] cursor-pointer">File</button>
                <button className="py-[3px] px-[5px] rounded-[5px] text-[#fff] bg-[blue] cursor-pointer">Delete</button>
                <button className="py-[3px] px-[5px] rounded-[5px] text-[#fff] bg-[blue] cursor-pointer">Present Mode</button>
            </div>
            <button onClick={handleLogout}>
                <MdLogout className='text-[30px] cursor-pointer text-[#ff0084]' />
            </button>
        </div>
    </div>
  )
}

export default Header