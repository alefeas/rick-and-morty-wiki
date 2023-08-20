import { useState, useEffect } from 'react';
import axios from 'axios';
import { Character } from './character/Character.jsx';
import { useSessionStorage } from '../../hooks/sessionStorage.jsx';
import { Loader } from '../loader/Loader.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CharactersList = () => {
    const [characters, setCharacters] = useState([]);
    const [pages, setPages] = useState([]);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [currentPage, setCurrentPage] = useSessionStorage('currentPage',1)

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
        const apiUrl = `https://rickandmortyapi.com/api/character?page=${currentPage}`;
        fetchData(apiUrl);
    }, [currentPage]);

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
        <h1>List of Characters</h1>
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
            : <span className='loader'><Loader/></span>
        }
        <div className='paginationContainer'>
            <button className='changerPage' onClick={handlePrevPage} disabled={!prevPage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="LeftArrow"><path d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z" fill="#f5f5f5" class="color000000 svgShape"></path></svg>
            </button>
            <div className='pagesNumberContainer'>
                <span>{currentPage}</span>
                <span> - </span>
                <span>{pages}</span>
            </div>
            <button className='changerPage' onClick={handleNextPage} disabled={!nextPage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="RightArrow"><path d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z" fill="#f5f5f5" class="color000000 svgShape"></path></svg>
            </button>
        </div>
    </div>
    );
}