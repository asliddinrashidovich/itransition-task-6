import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {SyncLoader} from "react-spinners"

const API = import.meta.env.VITE_PRESENTATIONS_API

function Users() {
    const {id} = useParams()
    const [changeRole, setChangeRole] = useState(false)
    const [chan, setchan] = useState(false)
    const fetchPresentationUsers = async () => {
        const res = await axios.get(`${API}/api/presentations/${id}`);
        return res.data;
    };

    const { data: AllUsers} = useQuery({
        queryKey: [id.toString(), chan],
        queryFn: fetchPresentationUsers,
    });

    async function handleChangeRole(userId, role) {
        try {
            await axios.put(`${API}/api/presentations/${id}/role`, { userId, role })
            setChangeRole(false)
            setchan(prev => prev ? false : true)
        } 
        catch(err) {
            console.log(err)
        }
    }
    console.log(AllUsers)
  return (
    <div className="bg-[#fff] overflow-y-auto h-[90vh] w-[200px] rounded-[10px]  p-3">
        {AllUsers?.users?.map(item => (
            <div className="relative w-full flex mb-[5px] justify-between items-center rounded-[7px] px-[7px] py-[5px] bg-[#f1f1f1]" key={item.id}>
                <h2>{item.nickname}</h2>
                <p onClick={() => setChangeRole(prev => prev ? false : true)} className="px-[2px] text-[10px] bg-[gold] rounded-[7px] cursor-pointer">{item.role}</p>
                {changeRole && <div className="absolute w-[100px] h-[100px] right-0 top-[30px] p-[6px] rounded-[4px] bg-[#999]">
                    <div onClick={() => handleChangeRole(item.id, 'CREATOR')} className="p-[5px] bg-[#fff] mb-[10px] cursor-pointer rounded-[3px] w-full">
                        <p>Creator</p>
                    </div>
                    <div onClick={() => handleChangeRole(item.id, 'VIEWER')} className="p-[5px] bg-[#fff] cursor-pointer rounded-[3px] w-full">
                        <p>Viewer</p>
                    </div>
                </div>}
            </div>
        ))}
        {!AllUsers?.users && (
            <div className="text-center">
                <SyncLoader size={10}/>
            </div>
        )}
    </div>   
  )
}

export default Users