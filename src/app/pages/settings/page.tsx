'use client'
import { useState } from "react";
import { FormEvent } from "react";
import { useAuth } from "../../context/authContext";
import Navbar from "../../components/navbar/Navbar"
export default function SettingsForm() {  
  const [name, setName] = useState('');
  const [password, setPasword] = useState('');
  const { darkMode , handleDarkMode } = useAuth();

  const setHandleDarkMode = () => {
   handleDarkMode()
  }
  const handlePost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData={
        name,
        password,
    }

    console.log(formData);
  }
  return (
  <div>
    <Navbar />
    <div className='dark:bg-darkVoid dark:text-blancoHueso bg-blancoHueso text-darkVoid h-screen flex items-center justify-center'>

      <div className='dark:bg-slateGray bg-blancoHueso p-8 rounded-lg shadow-lg w-full max-w-md'>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">SETTINGS</h1>
          <button
            className="text-blancoHueso bg-slateGray p-2 rounded-full"
            onClick={ setHandleDarkMode}
          >
            { darkMode ? '🌞' : '🌜'}
          </button>
        </div>
        <form onSubmit={handlePost}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="username">
              Username (edit)
            </label>
            <input
              className={`${darkMode ? 'bg-dustyGray text-blancoHueso placeholder:text-darkVoid' : 'bg-blancoHueso text-darkVoid border-2'} w-full p-2 rounded`}
              type="text"
              id="username"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="password">
              Password (edit)
            </label>
            <input
              className={`${darkMode ? 'bg-dustyGray text-blancoHueso placeholder:text-darkVoid' : 'bg-blancoHueso text-darkVoid border-2'} w-full p-2 rounded `}
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPasword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`${darkMode ? 'bg-liquidLava text-blancoHueso' : 'bg-liquidLava text-blancoHueso'} w-full p-2 rounded hover:bg-ligthPurple transition-colors`}
          >
            Send
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}