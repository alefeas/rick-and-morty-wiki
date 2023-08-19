import { useState, useEffect } from 'react';
import axios from 'axios';
import { Character } from './character/Character.jsx';

export const CharactersList = () => {
    const [characters, setCharacters] = useState([]);
    const [pages, setPages] = useState([]);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)

    const fetchData = async (url) => {
        try {
            const response = await axios.get(url);
            const data = response.data;
            setCharacters(data.results);
            setPrevPage(data.info.prev);
            setNextPage(data.info.next);
            setPages(data.info.pages)
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        }
    };

    useEffect(() => {
        const apiUrl = 'https://rickandmortyapi.com/api/character';
        fetchData(apiUrl);
    }, []);

    console.log(characters);
    const handlePrevPage = () => {
        if (prevPage) {
            setCharacters([])
            fetchData(prevPage);
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (nextPage) {
            setCharacters([])
            fetchData(nextPage);
            setCurrentPage(currentPage + 1);
        }
    };
    
    return (
    <div>
        <h1>Lista de Personajes de Rick and Morty</h1>
        {
            characters.length > 0 ?
            <div className='charactersList'>  
            {
                characters.map(item => (
                    <div>
                        <Character key={item.id} id={item.id} image={item.image} name={item.name} location={item.location} origin={item.origin}/>
                    </div>
                ))
            }
            </div>
            : <span className='loader'>loading...</span>
        }
        <div>
        <button onClick={handlePrevPage} disabled={!prevPage}>
            Página Anterior
        </button>
        <span>{currentPage}</span>
        <span> -     </span>
        <span>{pages}</span>
        <button onClick={handleNextPage} disabled={!nextPage}>
            Siguiente Página
        </button>
        </div>
    </div>
    );
}