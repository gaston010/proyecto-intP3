import React, { useEffect, useState } from 'react'
import { VscError } from "react-icons/vsc";
import Cookies from 'js-cookie';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] =useState('');
    const [uName, setUName] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [profPic, setProfPic] = useState('');
    const [uState, setUState] = useState(null);

    const fetchProfile = async (url, options = {}) => {
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setUName(data.username);
            setFName(data.first_name);
            setLName(data.last_name);
            setEmail(data.email);
            setProfPic(data.image);
            setUState(data.state);
        } catch (err) {
            setIsError(true)
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile(
            "http://sandbox.academiadevelopers.com/users/profiles/1",
            {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRFToken": Cookies.get("authToken"),
                },
              }
        )
    }, []);

    const url = 'https://yt3.ggpht.com/a/AATXAJzSv13Gra7X1Y93EuS_713fDbTJAehAKYlBSw=s900-c-k-c0xffffffff-no-rj-mo';
    
  return (
    <div className='flex gap-5 flex-col justify-around items-center bg-white rounded-lg p-10'>
        {isLoading && (
            // <span className='animate-spin size-32'></span>
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
            </div>
        )}
        {uName && (
            <>
            <div className='flex flex-col space-y-4 justify-around items-center'>
                <img src={url} alt="profile picture" 
                className='rounded-full w-32 shadow-lg shadow-fuchsia-500'/>
                <span className='text-4xl text-zinc-600'>
                    {uName}
                </span>
            </div>
            <div className='flex flex-col items-center'>
                <div className='flex flex-row justify-between gap-4'>
                    <span className='font-bold text-zinc-500'>
                        Nombre:
                    </span>
                    <span className='text-zinc-500'>
                        {fName}
                    </span>
                </div>
                <div className='flex flex-row justify-between gap-4'>
                    <span className='font-bold text-zinc-500'>
                        Apellido:
                    </span>
                    <span className='text-zinc-500'>
                        {lName}
                    </span>
                </div>
                <div className='flex flex-row justify-between gap-4'>
                    <span className='font-bold text-zinc-500'>
                        Email:
                    </span>
                    <span className='text-zinc-500'>
                        {email}
                    </span>
                </div>
                <div className='flex flex-row justify-between gap-4'>
                    <span className='font-bold text-zinc-500'>
                        Estado:
                    </span>
                    <span className='text-zinc-500'>
                        {uState}
                    </span>
                </div>
            </div>
            </>
        )}
    </div>
  )
}

export default Profile
