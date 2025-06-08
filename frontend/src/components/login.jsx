import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePresentationStore from "../store/usePresentationStore";

const FormLogin = () => {
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const setNickname = usePresentationStore((state) => state.setNickname);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setNickname(input.trim());
        navigate('/presentations');
    };

    return (
       <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700">Enter your nickname:</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Your nickname"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </form>
    )
}

export default FormLogin;