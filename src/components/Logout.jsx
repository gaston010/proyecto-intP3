import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { VscError } from "react-icons/vsc";
import { IoWarningOutline } from "react-icons/io5";
import Cookies from 'js-cookie';
import { ThemeContext } from '../context/ThemeContext';

const Logout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] =useState('');
    const [isAsking, setIsAsking] = useState(true);
    const [status, setStatus] = useState('');
    const token = Cookies.get("authToken");
    const navigate = useNavigate(); // Hook to programmatically navigate
    const { darkTheme } = useContext(ThemeContext);

    const logout = async (url, options = {}) => {
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setStatus(data.status);
            setIsAsking(false);
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
        navigate("/");
    }

  return ( 
    <div className={` flex gap-5 flex-col justify-around items-center rounded-lg p-10 ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
        { isAsking && (
            <div className={`flex flex-col justify-center items-center gap-4`}>
                <IoWarningOutline className='w-20'/>
                <p className='text-4xl'>¿Seguro que desea cerrar sesión?</p>
                <span className='flex flex-row justify-between gap-4'>
                    <form onSubmit={handleSubmit} onAbort={handleAbort}>
                        <button type="submit" className={`button ${darkTheme ? 'theme-dark-button' : 'theme-light-button'}`}>Logout</button>
                        <button type="abort"  className={`button ${darkTheme ? 'theme-dark-button' : 'theme-light-button'}`}>Cancel</button>
                    </form>
                </span>
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
