import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { VscError } from "react-icons/vsc";
import { IoWarningOutline } from "react-icons/io5";
import Cookies from 'js-cookie';

const Logout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] =useState('');
    const [isAsking, setIsAsking] = useState(true);
    const [status, setStatus] = useState('');
    const token = Cookies.get("authToken");
    const navigate = useNavigate(); // Hook to programmatically navigate

    const logout = async (url, options = {}) => {
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setStatus(data.status);
        } catch (err) {
            setIsError(true)
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        logout("https://sandbox.academiadevelopers.com/users/profiles/logout/",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                }
            });
      }

    const handleAbort = (e) => {
        e.preventDefault();
        navigate("/news");
    }

    const handleLeave = (e) => {
        Cookies.remove("authToken");
        navigate("/home");
    }

  return ( 
    <div className='flex gap-5 flex-col justify-around items-center bg-white rounded-lg p-10'>
        { isAsking && (
            <div className='flex flex-col justify-center items-center gap-4'>
                <IoWarningOutline className='w-20'/>
                <span className='text-4xl'>¿Seguro que desea cerrar sesión?</span>
                <span className='flex flex-row justify-between gap-4'>
                    <form onSubmit={handleSubmit} onAbort={handleAbort}>
                        <button type="submit">Logout</button>
                        <button type="abort" >Cancel</button>
                    </form>
                </span>
            </div>
        )}
        {isLoading && (
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                    </div>
                </div>
        )}
        {isError && (
            <div className='flex flex-col justify-center items-center gap-4'>
                <VscError className='w-20'/>
                <span className='text-4xl'>{error}</span>
                <button onClick={navigate('/logout')}>Back</button>
            </div>
        )}
        {status && (
            <div className='flex flex-col space-y-4 justify-around items-center'>
                <span className='text-4xl text-zinc-600'>
                    {status}
                </span>
                <button onClick={handleLeave}>Leave</button>
            </div>
        )}
    </div>
  )
}

export default Logout;
