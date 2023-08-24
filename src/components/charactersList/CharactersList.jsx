import { useState, useEffect } from 'react';
import axios from 'axios';
import { Character } from './character/Character.jsx';
import { useSessionStorage } from '../../hooks/sessionStorage.jsx';
import { Loader } from '../loader/Loader.jsx';
import { Search } from '../search/Search.jsx';
import { Status } from '../filter/status/Status.jsx';
import { Gender } from '../filter/gender/Gender.jsx';
import { Species } from '../filter/species/Species.jsx';

export const CharactersList = () => {
    const [characters, setCharacters] = useState([]);
    const [status, setStatus] = useSessionStorage('status', '')
    const [gender, setGender] = useSessionStorage('gender', '')
    const [species, setSpecies] = useSessionStorage('species', '')
    const [pages, setPages] = useState([]);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [currentPage, setCurrentPage] = useSessionStorage('currentPage', 1);
    const [searchTerm, setSearchTerm] = useSessionStorage('searchTerm', '');
    const [loading, setLoading] = useState(false)

    const fetchData = async (url) => {
        setLoading(true)
        try {
            const response = await axios.get(url);
            const data = response.data;
            setCharacters(data.results);
            setPrevPage(data.info.prev);
            setNextPage(data.info.next);
            setPages(data.info.pages);
        } catch (error) {
            setCharacters([])                
            console.error('Error al obtener datos de la API:', error);
        }
        setLoading(false)
    };
    
    const apiUrl = `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${searchTerm}&status=${status}&gender=${gender}&species=${species}`
    
    useEffect(() => {
        fetchData(apiUrl);
    }, [apiUrl]);

    const handlePrevPage = () => {
        if (prevPage && loading === false) {
            setCharacters([]);
            fetchData(prevPage);
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (nextPage && loading === false) {
            setCharacters([]);
            fetchData(nextPage);
            setCurrentPage(currentPage + 1);
        }
    };
    const resetFilter = () => {
        setCurrentPage(1)
        setStatus('')
        setGender('')
        setSpecies('')
        setSearchTerm('')
    }

    return (
        <div>
            <h1>Rick and Morty Wiki</h1>
            <div className='searchContainer'>
                <div className='searchResetContainer'>
                    <Search setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} searchTerm={searchTerm}/>
                    <button className='resetButton' id='resetButtonSmaller'>RESET FILTERS</button>
                </div>
                <div className='filtersContainer'>
                    <div className='selectContainer'>
                        <div className='selectCategoryContainer'>
                            <span className='selectName'>Status: </span>
                            <Status setCurrentPage={setCurrentPage} setStatus={setStatus} status={status}/>
                        </div>
                        <div className='selectCategoryContainer'>
                            <span className='selectName'>Gender: </span>
                            <Gender setCurrentPage={setCurrentPage} setGender={setGender} gender={gender}/>
                        </div>
                        <div className='selectCategoryContainer'>
                            <span className='selectName'>Species: </span>
                            <Species setCurrentPage={setCurrentPage} setSpecies={setSpecies} species={species}/>
                        </div>
                    </div>
                    <button className='resetButton' onClick={resetFilter}>RESET FILTERS</button>
                </div>
            </div>
            {loading === false ? (
                <div className='charactersList'>
                    {
                        characters.length > 0 ?
                        <>
                        {characters.map(item => (
                            <div key={item.id}>
                                <Character id={item.id} image={item.image} name={item.name} location={item.location} origin={item.origin} />
                            </div>
                        ))}
                        </>
                        : <span className='noResults'>No results for this search</span>
                    }
                </div>
            ) : (
                <span className='loader'><Loader /></span>
            )}
            <div className='paginationContainer'>
                <button className='changerPage' onClick={handlePrevPage} disabled={!prevPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="LeftArrow"><path d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z" fill="#f5f5f5" class="color000000 svgShape"></path></svg>
                </button>
                <div className='pagesNumberContainer'>
                    {
                        characters.length === 0 && loading === false ?
                        <span>0 - 0</span>
                        :
                        <div>
                            <span>{currentPage}</span>
                            <span> - </span>
                            <span>{pages}</span>
                        </div>
                    }
                </div>
                <button className='changerPage' onClick={handleNextPage} disabled={!nextPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="RightArrow"><path d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z" fill="#f5f5f5" class="color000000 svgShape"></path></svg>
                </button>
            </div>
        </div>
    );
}