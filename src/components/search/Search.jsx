export const Search = ({setCurrentPage, setSearchTerm, searchTerm}) => {
    const onChangeInput = (inputValue) => {
        setCurrentPage(1)
        setSearchTerm(inputValue)
    }

    return (
        <input
            type="text"
            placeholder="Search characters..."
            value={searchTerm}
            onChange={(e) => onChangeInput(e.target.value)}
        />
    )
}
