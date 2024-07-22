'use client'

import React, { useState, useEffect, FormEvent } from 'react';
import { useSearchPostsQuery, useSearchUsersQuery } from '@/redux/services/search';
const SearchBar = () => {
    const [searchParameter, setSearchParameter] = useState('');
    const [filter, setFilter] = useState('people');
    const [results, setResults] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
        }
    }, []);

    const { data: usersData, error: usersError } = useSearchUsersQuery(searchParameter, {
        skip: filter !== 'people' || !token,
    });

    const { data: postsData, error: postsError } = useSearchPostsQuery(searchParameter, {
        skip: filter !== 'posts' || !token,
    });

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!token) {
            console.error('No token available');
            return;
        }

        const cacheKey = `${searchParameter}_${filter}`;
        const cachedResults = localStorage.getItem(cacheKey);

        if (cachedResults) {
            console.log('Resultados desde el caché:', JSON.parse(cachedResults));
            setResults(JSON.parse(cachedResults));
            return;
        }

        if (filter === 'people' && usersData) {
            const filteredUsers = usersData.map((user) => ({
                age: user.age,
                fullName: user.fullName,
                profileImage: user.profileImage,
                userName: user.userName,
                location: user.location,
            }));
            localStorage.setItem(cacheKey, JSON.stringify(filteredUsers));
            setResults(filteredUsers);
        } else if (filter === 'posts' && postsData) {
            localStorage.setItem(cacheKey, JSON.stringify(postsData));
            setResults(postsData);
        }

        if (usersError) {
            console.error('Error fetching users:', usersError);
        }
        
        if (postsError) {
            console.error('Error fetching posts:', postsError);
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
            <SearchUser results={results} />
        </div>
    );
};

const SearchUser = ({ results }) => {
    const defaultProfileImage = 'https://www.example.com/default-profile.png'; // Reemplaza con la URL de la imagen por defecto

    return (
        <div className="mt-4">
            {results && results.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((result, index) => (
                        <li key={index} className="border border-dustyGray rounded-lg p-4 shadow-md flex flex-col items-center text-center">
                            <img 
                                src={result.profileImage || defaultProfileImage} 
                                alt={result.userName} 
                                className="w-24 h-24 rounded-full object-cover mb-4" 
                            />
                            <div>
                                <p className="font-bold text-lg">{result.fullName}</p>
                                <p className="text-gray-500">@{result.userName}</p>
                                <p className="text-gray-500">Age: {result.age}</p>
                                <p className="text-gray-500">Location: {result.location || 'Unknown'}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay resultados</p>
            )}
        </div>
    );
};

export default SearchBar;
