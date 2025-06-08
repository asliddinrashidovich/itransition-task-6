import { useState } from "react";
import ContentEditable from "react-contenteditable"

function EditSlide() {
    const [html, setHtml] = useState('Text');

    const handleChange = e => {
        setHtml(e.target.value);
    };
  return (
    <div className=" p-3 flex items-center justify-center">
        <div className="border-[1px] flex items-center justify-center bg-[#fff] border-[#222] rounded-[4px] h-[400px] max-w-[600px] w-full">
             <ContentEditable
                  html={html}
                  onChange={handleChange}
                  tagName="div"
                  className="editable-block text-[30px]"
                  style={{ position: 'absolute' }}
                />
        </div>
    </div>
  )
}

export default EditSlide