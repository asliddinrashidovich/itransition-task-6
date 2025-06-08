import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { RiDeleteBin6Line } from "react-icons/ri";

const API = import.meta.env.VITE_PRESENTATIONS_API

function Slides() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [slidesLength, setSlidesLength] = useState(false)
    const fetchPresentationList = async () => {
        const res = await axios.get(`${API}/api/presentations/${id}`);
        return res.data;
    };

    const { data: AllSlides} = useQuery({
        queryKey: ["slides", slidesLength],
        queryFn: fetchPresentationList,
    });
    console.log(AllSlides)

    async function handleAddSlide() {
        try {
            await axios.post(`${API}/api/presentations/${id}/slides`, { index: AllSlides?.slides?.length })
            setSlidesLength(prev => prev ? false : true)
        } 
        catch(err) {
            console.log(err)
        }
    }

    async function handleDelete(slideId) {
        try {
            await axios.delete(`${API}/api/presentations/${id}/slides/${slideId}`, { slideId })
            setSlidesLength(prev => prev ? false : true)
        } 
        catch(err) {
            console.log(err)
        }
    }

    function handleClickSlide(id) {
        navigate(`/presentations/cmbn4osfk0000nouwr6g6mr19/${id}`)
    }
  return (
    <div className="bg-[#fff]  overflow-y-auto h-[90vh] w-[250px] rounded-[10px]  p-3">
        <h2 className="text-[20px] text-center font-[600] mb-[10px]">{AllSlides?.title}</h2>
        <hr className="mb-[10px]"/>
        {AllSlides?.slides && AllSlides?.slides.map((item, i) => (
            <div  key={item.key} className="border-[1px] border-[#222] flex items-center cursor-pointer relative justify-center  rounded-[7px] p-[5px] h-[150px] mb-[10px]">
                <h2 onClick={() => handleClickSlide(item.id)} className="text-[25px]">Slide {i+1}</h2>
                <button onClick={() => handleDelete(item.id)} className="absolute top-3 right-3">
                    <RiDeleteBin6Line className="text-[red]"/>
                </button>
            </div>
        ))}
        {!AllSlides?.slides && (
            <div className="text-center">
                <SyncLoader size={10}/>
            </div>
        )}
        <div onClick={handleAddSlide} className="border-[1px] border-[#222] bg-[#999] flex items-center cursor-pointer justify-center  rounded-[7px] p-[5px] h-[30px] mb-[20px]">
            <h2 className="text-[20px]">Add Slide</h2>
        </div>
    </div>  
  )
}

export default Slides