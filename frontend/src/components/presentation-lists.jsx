import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {  Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from "moment"
import { MdLogout } from "react-icons/md";
import { SyncLoader } from 'react-spinners';


const API = import.meta.env.VITE_PRESENTATIONS_API

const PresentationList = () => {
  const [newTitle, setNewTitle] = useState('');
  const [search, setSearch] = useState('')
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate();
    const nickname = JSON.parse(localStorage.getItem('presentation-storage'))

    const fetchPresentationsList = async () => {
        const res = await axios.get(`${API}/api/presentations`);
        const allProducts =  res.data;
        const searchEd = allProducts.filter((user) =>  user.title.toLowerCase().includes(search.toLowerCase()) );
        return searchEd;
    };

    const { data: AllPresentations} = useQuery({
        queryKey: ["titles", search, refresh],
        queryFn: fetchPresentationsList,
    });


    async function handleClick(id) {
        try {
            await axios.post(`${API}/api/presentations/${id}/join`, { nickname: nickname.state.nickname })
            navigate(`/presentations/${id}`)
        } 
        catch(err) {
            console.log(err)
        }
    }

    async function createPresentation(e) {
        e.preventDefault()
        try {
            await axios.post(`${API}/api/presentations`, { title: newTitle, nickname: nickname.state.nickname })
            setRefresh(prev => prev ? false : true)
        } 
        catch(err) {
            console.log(err)
        }
    }

    
    function handleChange(val){
        setSearch(val)
    }

    function handleLogout() {
        localStorage.clear()
        navigate('/')
    }

  return (
    <div className="p-5 md:p-10 ">
        <div className='max-w-[1200px] mx-auto'>
            <div className='flex items-center justify-between mb-[20px]'>
                <h1 className="text-3xl font-bold mb-4">All Presentations</h1>
                <div className='flex items-center gap-[20px]'>
                    <input
                        onChange={(e) => handleChange(e.target.value)}
                        type="text"
                        placeholder="search"
                        className="border p-2 rounded w-full mr-2 max-w-[200px]"
                    />
                    <button onClick={handleLogout}>
                        <MdLogout className='text-[30px] text-[#ff0084]' />
                    </button>
                </div>
            </div>
            <form onSubmit={createPresentation} className="flex mb-6 max-w-[600px] mx-auto">
                <input
                    required
                    type="text"
                    placeholder="New presentation title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="border p-2 rounded w-full mr-2"
                />
                <button className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded">
                    Create
                </button>
            </form>
            <div className=" overflow-x-auto">
                <table className="w-full bg-[#fff]">
                    <thead className="sticky top-0 bg-[#fff] z-10">
                        <tr className="border-b-[2px] border-[#444]">
                            <td className="min-w-[200px] text-[17px] py-[5px] font-[700] pl-[10px]">Title</td>
                            <td className="min-w-[200px] text-[17px] py-[5px] font-[700]">Author</td>
                            <td className="min-w-[200px] text-[17px] py-[5px] font-[700]">Uploaded</td>
                            {/* <td className="min-w-[200px] text-[17px] py-[5px] font-[700]">Delete</td> */}
                        </tr>
                    </thead>
                    <tbody>
                        {AllPresentations?.map((item) => (
                            <Fragment key={item.index}>
                                <tr onClick={() => handleClick(item.id)} className='border-b-[1px] border-[#999] hover:bg-[#f2f2f2] transition-all duration-200 cursor-pointer'>
                                    <td className="text-[18px] font-[600] py-[5px] pl-[10px]">{item.title}</td>
                                    <td className="text-[17px] py-[5px] font-[400] pr-[10px]">{item.users[0].nickname}</td>
                                    <td className="text-[17px] py-[5px] font-[400]">{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                                    {/* <td>
                                        {item.users[0].nickname == nickname.state.nickname && <button><FaRegTrashCan /></button>}
                                        {item.users[0].nickname != nickname.state.nickname && <button></button>}
                                    </td> */}
                                </tr>
                            </Fragment>
                        ))}
                        </tbody>
                    </table>
                </div>
                {!AllPresentations && (
                    <div className="text-center">
                        <div className='text-center py-[100px]'>
                            <SyncLoader size={15}/>
                        </div>
                    </div>
                )}
        </div>
    </div>
  );
};

export default PresentationList;
