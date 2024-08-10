import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SearchBar = () =>{

    const [value, setValue] = useState('');
    const [path, redirect] = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        redirect('/');
    }

    const handleInput = (e) => {
        setValue(e.target.value);
    } 

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleInput} placeholder="Search songs..." />
            <input type="submit" value="Search" />
        </form>
    );
}

export default SearchBar;