import { useState, useEffect } from 'react';
import axios from 'axios';
import { Location } from './location/Location.jsx';

export const LocationsList = () => {
    const [locations, setLocations] = useState([]);
    const [pages, setPages] = useState([]);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)

    const fetchData = async (url) => {
        try {
            const response = await axios.get(url);
            const data = response.data;
            setLocations(data.results);
            setPrevPage(data.info.prev);
            setNextPage(data.info.next);
            setPages(data.info.pages)
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        }
    };

    useEffect(() => {
        const apiUrl = 'https://rickandmortyapi.com/api/location';
        fetchData(apiUrl);
    }, []);

    console.log(locations);
    const handlePrevPage = () => {
        if (prevPage) {
            fetchData(prevPage);
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (nextPage) {
            fetchData(nextPage);
            setCurrentPage(currentPage + 1);
        }
    };
    
    return (
    <div>
        <h1>Lista de ubicaciones de Rick and Morty</h1>
        <duv className='charactersList'>  
        {
            locations.map(item => (
                <div>
                    <Location key={item.id} image={item.image} name={item.name}/>
                </div>
            ))
        }
        </duv>
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
