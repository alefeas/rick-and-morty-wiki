import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import React from 'react';
import Modal from 'react-modal';
import { Loader } from "../../loader/Loader.jsx";

const customStyles = {
    content: {
        width: '300px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

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
            openModal()
        }
    }

    useEffect(() => {
        const apiUrl = `https://rickandmortyapi.com/api/character/${id}`
        fetchData(apiUrl)
    }, [id])

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }
    function closeModal() {
        setIsOpen(false);
    }
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
                            <span className="spanLocation" onClick={() => fetchLocation(character.origin.url)}> {character.origin.name}</span>
                            : <span> {character.origin.name}</span>
                        }
                    </span>
                    <span>Last location endpoint: 
                        {
                            character.location.url !== '' ?
                        <span className="spanLocation" onClick={() => fetchLocation(character.location.url)}> {character.location.name}</span>
                        : <span> {character.location.name}</span>
                        }
                    </span>

                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <button onClick={closeModal}>close</button>
                        <h4 ref={(_subtitle) => (subtitle = _subtitle)}>{location.name}</h4>
                        <div className="infoLocationContainer">
                            <span>Type: {location.type}</span>
                            <span>Dimension: {location.dimension}</span>
                        </div>
                    </Modal>
                </div>
                : <span><Loader/></span>    
            }
        </>
    )
}