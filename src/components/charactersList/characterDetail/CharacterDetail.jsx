import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";

export const CharacterDetail = () => {
    const [character, setCharacter] = useState({})  
    const [location, setLocation] = useState({})
    const { id } = useParams()

    const fetchData = async (url) => {
        try {
            const response = await axios.get(url);
            const data = response.data;
            setCharacter(data);
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        }
    }

    const fetchLocation = async (url) => {
        if (url !== '') {
            const response = await axios.get(url);
            const locationInfo = response.data
            setLocation(locationInfo)
        }
    }

    useEffect(() => {
        const apiUrl = `https://rickandmortyapi.com/api/character/${id}`
        fetchData(apiUrl)
    }, [id])

    return (
        <>
            {
                character.image ?
                <div className="itemDetail">
                    <img src={character.image} alt="" />
                    <h3>{character.name}</h3>
                    <span>Gender: {character.gender}</span>
                    <span>Status: {character.status}</span>
                    <span>Species: {character.species}</span>
                    <span>Origin location: 
                        {
                            character.origin.url !== '' ?
                            <span className="spanLocation" onClick={() => fetchLocation(character.origin.url)}>{character.origin.name}</span>
                            : <span> {character.origin.name}</span>
                        }
                    </span>
                    <span>Last location endpoint: <span className="spanLocation" onClick={() => fetchLocation(character.location.url)}>{character.location.name}</span></span>
                    <h4>{location.name}</h4>
                    <span>Type: {location.type}</span>
                    <span>Dimension: {location.dimension}</span>
                </div>
                : <span>loading...</span>    
            }
        </>
    )
}