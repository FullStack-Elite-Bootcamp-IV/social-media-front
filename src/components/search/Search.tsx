'use client'

import React, { useState, FormEvent } from 'react';

const SearchBar = () => {
    const [searchParameter, setSearchParameter] = useState('');
    const [filter, setFilter] = useState('people');
    const [results, setResults] = useState([]);

    const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const cacheKey = `${searchParameter}_${filter}`;
        const cachedResults = localStorage.getItem(cacheKey);

        if (cachedResults) {
            console.log('Resultados desde el caché:', JSON.parse(cachedResults));
            setResults(JSON.parse(cachedResults));
            return;
        }

        const requestBody = JSON.stringify({
            filter: filter,
            searchParameter: searchParameter
        });
        console.log('Request Body:', requestBody);

        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            localStorage.setItem(cacheKey, JSON.stringify(data));
            console.log('Resultados desde la API:', data);
            setResults(data);
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
        }
    };

    return (
        <div className="w-full p-4">
            <div className="flex justify-center w-full">
                <div className="flex items-center w-full max-w-screen-lg bg-blancoHueso border border-dustyGray rounded-full p-2 shadow-md">
                    <form onSubmit={handleSearch} className="flex items-center w-full">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="ml-2 bg-transparent outline-none text-lg text-slateGray"
                        >
                            <option value="people">Personas</option>
                            <option value="posts">Publicaciones</option>
                        </select>
                        <input
                            type="text"
                            value={searchParameter}
                            onChange={(e) => setSearchParameter(e.target.value)}
                            placeholder="Buscar En Nexo"
                            className="ml-2 w-full bg-transparent outline-none text-lg text-center text-slateGray"
                        />
                        <button type="submit" className="ml-2 p-2 bg-ligthPurple text-white rounded-full">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.9 4.9a1 1 0 01-1.414 1.414l-4.9-4.9zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
