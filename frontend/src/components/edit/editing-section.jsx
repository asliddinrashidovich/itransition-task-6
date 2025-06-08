import { Outlet } from "react-router-dom"
import Slides from "./slides"
import Users from "./users"

function EditinSection() {
  return (
    <div className="px-[10px] w-full relative">
        <div className="fixed p-[20px]  bottom-0 top-[70px] h-[80vh] left-0">
            <Slides/>
        </div>
        <div className="ml-[250px] mr-[200px] p-[40px] ">
          <Outlet/>
        </div>
        <div className="fixed p-[20px]  bottom-0 top-[70px] h-[80vh] right-0">
            <Users/>
        </div>
    </div>
  )
}

export default EditinSection