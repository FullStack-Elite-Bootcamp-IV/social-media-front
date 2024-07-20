'use client'

import React, { useState } from "react";
import { FormEvent } from "react";


const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
   
    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(searchTerm)
      };

    return (
        
        <div className="flex items-center bg-blancoHueso border border-dustyGray rounded-full p-2 shadow-md m-2">
            
            <form onSubmit={handleSearch} className="flex items-center w-full">
                <div className="flex items-center justify-center">
                    <svg className="w-6 h-6 text-ligthPurple" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.9 4.9a1 1 0 01-1.414 1.414l-4.9-4.9zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
                    </svg>
                </div>
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar En Nexo" 
                    className="ml-2 w-full bg-transparent outline-none text-lg text-center text-slateGray"
                />
                <div className="flex items-center justify-center">
                    <button type="submit" className="w-6 h-6 text-ligthPurple focus:outline-none">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;