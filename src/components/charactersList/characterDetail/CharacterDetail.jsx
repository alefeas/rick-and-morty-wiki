import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import React from 'react';
import Modal from 'react-modal';
import { Loader } from "../../loader/Loader.jsx";

const customStyles = {
    content: {
        width: '600px',
        backgroundColor: '#1a1a1a',
        fontSize: '20px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
};

export const CharacterDetail = () => {
    const [character, setCharacter] = useState({})  
    const [location, setLocation] = useState({})
    const { id } = useParams()

    const colorStatus = () => {
        if (character.status === 'Dead') {
            return <div className="mark redMark"></div>
        } else if (character.status === 'Alive') {
            return <div className="mark greenMark"></div>
        } else {
            return <div className="mark greyMark"></div>
        }
    }
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
        <div className="detailContainer">
            {
                character.image ?
                <div className="itemDetail">
                    <img src={character.image} alt="" />
                    <div>
                        <div className="infoDetailContainer">
                            <h3>{character.name}</h3>
                            <span className="status">{colorStatus()} {character.status} | {character.species}</span>
                            <span className="genreContainer">Genre: <span>{character.gender}</span></span>
                            <span className="locationsContainer">Origin location: 
                                {
                                    character.origin.url !== '' ?
                                    <span className="spanLocation" onClick={() => fetchLocation(character.origin.url)}> {character.origin.name}</span>
                                    : <span> {character.origin.name}</span>
                                }
                            </span>
                            <span className="locationsContainer">Last location endpoint: 
                                {
                                    character.location.url !== '' ?
                                    <span className="spanLocation" onClick={() => fetchLocation(character.location.url)}> {character.location.name}</span>
                                    : <span> {character.location.name}</span>
                                }
                            </span>
                        </div>
                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <svg onClick={closeModal} className='closeModalButton' xmlns="http://www.w3.org/2000/svg" stroke="#f5f5f5" viewBox="0 0 32 32" id="X"><path stroke-width="4" d="m2 2 28 28M2 30 30 2" fill="#f5f5f5" class="color000000 svgShape"></path></svg>
                        <h4 style={{marginTop:'5px'}} ref={(_subtitle) => (subtitle = _subtitle)}>{location.name}</h4>
                        <div className="infoLocationContainer">
                            <span>Type: {location.type}</span>
                            <span>Dimension: {location.dimension === '' ? 'Unknown' : location.dimension}</span>
                        </div>
                    </Modal>
                </div>
                : <span><Loader/></span>    
            }
        </div>
    )
}