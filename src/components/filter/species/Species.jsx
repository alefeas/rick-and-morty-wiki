import { SelectCategory } from '../SelectCategory.jsx';

export const Species = ({setCurrentPage, setSpecies, species}) => {
    const speciesArray = [
        {
            label: 'Human',
            value: 'Human'
        },
        {
            label: 'Alien',
            value: 'Alien'
        },
        {
            label: 'Humanoid',
            value: 'Humanoid'
        },
        {
            label: 'Poopybutthole',
            value: 'Poopybutthole'
        },
        {
            label: 'Mythological',
            value: 'Mythological'
        },
        {
            label: 'Unknown',
            value: 'Unknown'
        },
        {
            label: 'Animal',
            value: 'Animal'
        },
        {
            label: 'Disease',
            value: 'Disease'
        },
        {
            label: 'Robot',
            value: 'Robot'
        },
        {
            label: 'Cronenberg',
            value: 'Cronenberg'
        },
    ]

    return (
        <SelectCategory category={species} setCategory={setSpecies} setCurrentPage={setCurrentPage} options={speciesArray}/>
    )
}