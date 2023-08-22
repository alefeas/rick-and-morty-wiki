export const Species = ({setCurrentPage, setSpecies}) => {
    const filter = (selectValue) => {
        setCurrentPage(1)
        setSpecies(selectValue)
    }

    return (
        <select placeholder='species' onChange={(e) => filter(e.target.value)} name="species" id="" >
            <option value="alien">alien</option>
            <option value="human">human</option>
            <option value="humanoid">humanoid</option>
        </select>
    )
}
